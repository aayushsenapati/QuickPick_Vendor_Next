import { db } from '@/app/firebase/config';
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
  const body = await request.json()
  const { restaurantName, upiId, email } = body
  // console.log(restaurantName, upiId, email)

  // Check for existing restaurant name
  const r = query(collection(db, "restaurants"), where("name", "==", restaurantName), limit(1))
  const existingRestaurantSnapshot = await getDocs(r);
  if (existingRestaurantSnapshot.docs.length > 0) {
    return NextResponse.json({ error: "Restaurant name already exists", }, { status: 409 }); // Conflict status code
  }

  try {
    // Create a new restaurant document
    const restaurantRef = await addDoc(collection(db, "restaurants"), { name: restaurantName, upiId: upiId, menu: [] });

    // Get the vendor document
    const q = query(collection(db, "vendor"), where("email", "==", email), limit(1));
    const vendorSnapshot = await getDocs(q);
    const vendorRef = vendorSnapshot.docs[0].ref;
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
  const body = await request.json();
  const { oldRestaurantName, restaurantName, upiId } = body;

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

    // Update the restaurant document
    await updateDoc(restaurantRef, { name: restaurantName, upiId: upiId, });

    return NextResponse.json({ success: true }, { status: 200 }); // Indicate successful update

  }
  catch (error) {
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