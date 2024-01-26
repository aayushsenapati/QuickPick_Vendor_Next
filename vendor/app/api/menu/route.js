import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/config';
import { collection, getDocs, where, query, getDoc, limit } from "firebase/firestore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurantName = searchParams.get('restaurantName');
  const email = searchParams.get('email');
  console.log(email)
  console.log(restaurantName)

  try {
    // 1. Retrieve vendor document by email
    const vendorDocRef = query(collection(db, "vendor"), where("email", "==", email), limit(1));
    const vendorDocSnapshot = await getDocs(vendorDocRef);
    // vendorDocSnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    if (!vendorDocSnapshot.empty) {
      const vendorData = vendorDocSnapshot.docs[0].data();

      // const restaurantRef = vendorData.restaurants.find(async (ref) => {
      //   const resref = await getDoc(ref)
      //   const restaurantNameFromRef = resref.data().name;
      //   console.log(restaurantNameFromRef)
      //   if (restaurantNameFromRef === restaurantName)
      //   {
      //     return ref;
      //   }

      // });
      const restaurantRefs = await Promise.all(vendorData.restaurants.map(async (ref) => {
        const resref = await getDoc(ref);
        const restaurantNameFromRef = resref.data().name;
        // console.log(restaurantNameFromRef)
        return { ref, restaurantNameFromRef };
      }));
      // console.log(restaurantRefs)
      const matchingRef = restaurantRefs.find((refData) => refData.restaurantNameFromRef === restaurantName);
      const restaurantRef = matchingRef?.ref;

      // console.log(restaurantRef)

      if (restaurantRef) {
        // 3. Fetch restaurant data
        const restaurantDocSnapshot = await getDoc(restaurantRef);
        const restaurantData = restaurantDocSnapshot.data();
        console.log(restaurantData)

        // 4. Extract menu with pricing
        const itemsWithPricing = restaurantData.menu.map((item) => ({
          name: item.name,
          price: item.price
        }));
        console.log(itemsWithPricing)
        return NextResponse.json({ itemsWithPricing }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'restaurant not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: 'vendor not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Firestore error:", error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}
