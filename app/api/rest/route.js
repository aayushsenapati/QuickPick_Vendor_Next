import { db, storage } from '@/app/firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { NextResponse } from 'next/server';
import { collection, getDocs, getDoc, where, limit, query, setDoc, updateDoc, arrayUnion, doc, addDoc, arrayRemove, deleteDoc } from "firebase/firestore";



export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  // console.log(email);

  const q = query(collection(db, "vendor"), where("email", "==", email), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const vendorData = querySnapshot.docs[0].data();
    const restaurantRefs = vendorData.restaurants;

    //Fetch restaurant names concurrently
    const restaurantNames = await Promise.all(
      restaurantRefs.map(async (ref) => {
        const restaurantDocSnapshot = await getDoc(ref);
        return restaurantDocSnapshot.data().name;
      })
    );

    // console.log(restaurantNames);
    return NextResponse.json({ restaurantNames }, { status: 200 });
  }
  else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

}

export async function POST(request) {
  const body = await request.formData();
  const restaurantName = body.get('restaurantName');
  const upiId = body.get('upiId');
  const email = body.get('email');
  const image = body.get('image');
  console.log('this is image', !!image, image === "undefined", image === "null");

  // Check for existing restaurant name
  const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1));
  const existingRestaurantSnapshot = await getDocs(r);
  if (existingRestaurantSnapshot.docs.length > 0) {
    return NextResponse.json({ error: "Restaurant name already exists", }, { status: 409 }); // Conflict status code
  }

  try {
    let downloadURL = await getDownloadURL(ref(storage, `restaurants/stock.jpg`));
    if (image !== "null") {
      const storageRef = ref(storage, `restaurants/${email}/${restaurantName}.jpg`);
      const snapshot = await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);
    }

    // Get the vendor document
    const q = query(collection(db, "vendor"), where("email", "==", email), limit(1));
    const vendorSnapshot = await getDocs(q);
    let vendorRef;
    if(vendorSnapshot.docs.length==0)
    {
        vendorRef = await addDoc(collection(db, "vendor"), { email: email, restaurants : [] });
    }
    else{
        vendorRef = vendorSnapshot.docs[0].ref;
    }
    // console.log(vendorRef)

    // Add the restaurant reference to the vendor's restaurants array
    await updateDoc(vendorRef, { restaurants: arrayUnion(restaurantRef), });

    return NextResponse.json({ success: true }, { status: 201 }); // Indicate successful creation
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
  }
}


export async function PUT(request) {
  const body = await request.formData();
  const restaurantName = body.get('restaurantName');
  const upiId = body.get('upiId');
  const oldRestaurantName = body.get('oldRestaurantName');
  const image = body.get('image');
  const email = body.get('email');

  console.log("old rest:", oldRestaurantName);
  console.log("new rest:", restaurantName);
  console.log("new upi:", upiId);

  // Check if old restaurant details
  if (oldRestaurantName == restaurantName) {
    const oldRestaurantSnapshot = await getDocs(
      collection(db, "restaurants"),
      where("name", "==", oldRestaurantName)
    );
    const oldRestaurantData = oldRestaurantSnapshot.docs[0].data();
    if (upiId == oldRestaurantData.upiId) {
      return NextResponse.json({
        error: "There is no change in the restaurant details",
      }, { status: 400 });
    }
  }

  // Check for existing restaurant name
  const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1))
  const existingRestaurantSnapshot = await getDocs(r);
  console.log(existingRestaurantSnapshot.docs.length)

  if (existingRestaurantSnapshot.docs.length > 0 && oldRestaurantName != restaurantName) {
    return NextResponse.json({ error: "Restaurant name already exists", }, { status: 409 }); // Conflict status code
  }

  try {
    // Retrieve the restaurant document to update
    const rd = query(collection(db, "restaurants"), where("name", "==", oldRestaurantName));
    const restaurantDoc = await getDocs(rd);

    if (restaurantDoc.docs.length === 0) {
      // Restaurant not found
      return NextResponse.json({
        error: "Restaurant not found",
      }, { status: 404 }); // Not found status code
    }

    const restaurantRef = restaurantDoc.docs[0].ref;
    const restaurantRefData = restaurantDoc.docs[0].data();

    let downloadURL = restaurantRefData.downloadURL;
    if (image !== "null") {
      const storageRef = ref(storage, `restaurants/${email}/${restaurantName}.jpg`);
      const snapshot = await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);

      // Delete the old image if it's not stock.jpg
      const oldImageURL = restaurantRefData.image;
      const stockImageURL = await getDownloadURL(ref(storage, "restaurants/stock.jpg"));
      if (oldImageURL !== stockImageURL) {
        const oldImageRef = ref(storage, `restaurants/${email}/${oldRestaurantName}.jpg`);
        await deleteObject(oldImageRef);
      }
    }

    // Update the restaurant document
    await updateDoc(restaurantRef, { name: restaurantName, upiId: upiId, image: downloadURL });

    return NextResponse.json({ success: true }, { status: 200 }); // Indicate successful update

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update restaurant" }, { status: 500 });
  }
}


export async function DELETE(request) {
  const body = await request.json()
  const { restaurantName, email } = body
  console.log(restaurantName, email)

  try {
    const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1))
    const RestaurantSnapshot = await getDocs(r);
    const RestaurantData = RestaurantSnapshot.docs[0].data();
    let downloadURL = RestaurantData.image;
    const stockexist = await getDownloadURL(ref(storage, "restaurants/stock.jpg"));
    if (downloadURL !== stockexist) {
      const storageRef = ref(storage, `restaurants/${email}/${restaurantName}.jpg`);
      await deleteObject(storageRef);
    }



    const RestaurantRef = RestaurantSnapshot.docs[0].ref;

    const q = query(collection(db, "vendor"), where("email", "==", email), limit(1));
    const vendorSnapshot = await getDocs(q);

    const vendorRef = vendorSnapshot.docs[0].ref;
    await updateDoc(vendorRef, {
      restaurants: arrayRemove(RestaurantRef),
    });

    await deleteDoc(RestaurantRef);
    return NextResponse.json({ success: true }, { status: 200 });
  }
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete restaurant" }, { status: 500 });
  }

}
