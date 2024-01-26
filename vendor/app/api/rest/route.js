import { db } from '@/app/firebase/config';
import { NextResponse } from 'next/server';
import { collection, getDocs ,getDoc, where , limit , query} from "firebase/firestore";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  console.log(email);

    // 1. Retrieve vendor document by email
    const q = query(collection(db, "vendor"), where("email", "==", email), limit(1)); 
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const vendorData =  querySnapshot.docs[0].data();

      // 2. Extract restaurant references
      const restaurantRefs = vendorData.restaurants;

      // 3. Fetch restaurant names concurrently
      const restaurantNames = await Promise.all(
        restaurantRefs.map(async (ref) => {
          const restaurantDocSnapshot = await getDoc(ref);
          return restaurantDocSnapshot.data().name;
        })
      );

      console.log(restaurantNames);

      return NextResponse.json({ restaurantNames }, { status: 200 });
    } else {
      // Handle vendor not found
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
   
}

