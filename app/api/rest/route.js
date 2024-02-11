import { db, storage } from '@/app/firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { NextResponse } from 'next/server';
import { collection, getDocs, getDoc, where, limit, query, setDoc, updateDoc, arrayUnion, doc, addDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  // 

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

    // 
    return NextResponse.json({ restaurantNames }, { status: 200 });
  }
  else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

}

export async function POST(request) {
  const body = await request.formData();
  const restaurantName = body.get('restaurantName');
  const upiId = body.get('upiId').trim();
  const email = body.get('email').trim();
  const image = body.get('image');
  
  
  
  if (restaurantName.trim() === '' || upiId === '') {
    
    return NextResponse.json({ error: "Restaurant name or UPI ID cannot be empty", }, { status: 400 }); // Bad request status code
  }

  // Check for existing restaurant name
  const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1));
  const existingRestaurantSnapshot = await getDocs(r);
  if (existingRestaurantSnapshot.docs.length > 0) {
    return NextResponse.json({ error: "Restaurant name already exists", }, { status: 409 }); // Conflict status code
  }

  try { 
    // Get the vendor document
    const q = query(collection(db, "vendor"), where("email", "==", email), limit(1));
    const vendorSnapshot = await getDocs(q);
    const vendorRef = vendorSnapshot.docs[0].ref;

    // Create a new restaurant document with a UUID as the document ID
    const restaurantId = uuidv4();
    let downloadURL = await getDownloadURL(ref(storage, `restaurants/stock.jpg`));
    if (image !== "null") {
      const storageRef = ref(storage, `restaurants/${email}/${restaurantId}.jpg`);
      const snapshot = await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);
      
    }
    const restaurantRef = doc(collection(db, "restaurants"), restaurantId);
    await setDoc(restaurantRef, { name: restaurantName, upiId: upiId, menu: [], image: downloadURL });

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
  const oldRestaurantName = body.get('oldRestaurantName');
  const upiId = body.get('upiId');
  const image = body.get('image');
  const email = body.get('email');

  
  

  try {
    const rd = query(collection(db, "restaurants"), where("name", "==", oldRestaurantName));
    const restaurantDoc = await getDocs(rd);
    if (restaurantDoc.docs.length === 0) {
      // Restaurant not found
      return NextResponse.json({
        error: "Restaurant  already exists",
      }, { status: 404 }); // Not found status code
    }

    const restaurantRef = restaurantDoc.docs[0].ref;
    const restaurantRefData = restaurantDoc.docs[0].data();
    const docId = restaurantRef.id;

    let downloadURL = restaurantRefData.downloadURL;
    if (image !== "null") {
      const storageRef = ref(storage, `restaurants/${email}/${docId}.jpg`);
      const snapshot = await uploadBytes(storageRef, image);
      downloadURL = await getDownloadURL(storageRef);
    }

    // Update the restaurant document
    const updateData = {};
    if (restaurantName !== restaurantRefData.name && restaurantName.trim() !== '') {
      updateData.name = restaurantName;
    }
    if (upiId !== restaurantRefData.upiId && upiId.trim() !== '') {
      updateData.upiId = upiId;
    }
    if (image !== "null" && downloadURL !== restaurantRefData.image) {
      updateData.image = downloadURL;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        error: "There is no change in the restaurant details",
      }, { status: 400 });
    }

    // Update the restaurant document
    await updateDoc(restaurantRef, updateData);

    return NextResponse.json({ success: true }, { status: 200 }); // Indicate successful update
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update restaurant" }, { status: 500 });
  }
}

export async function DELETE(request) {
  const body = await request.json()
  const { restaurantName, email } = body
  

  try {
    const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1))
    const RestaurantSnapshot = await getDocs(r);
    const RestaurantRef = RestaurantSnapshot.docs[0].ref;
    const RestaurantData = RestaurantSnapshot.docs[0].data();
    const docId = RestaurantRef.id;
    

    let downloadURL = RestaurantData.image;
    const stockexist = await getDownloadURL(ref(storage, "restaurants/stock.jpg"));
    if (downloadURL !== stockexist) {
      const storageRef = ref(storage, `restaurants/${email}/${docId}.jpg`);
      await deleteObject(storageRef);
    }


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
