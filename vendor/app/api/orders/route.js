import { db } from '@/app/firebase/config';
import { NextResponse } from 'next/server';
import { collection, getDocs, where, query, updateDoc, limit } from 'firebase/firestore';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurant = searchParams.get('restaurant');
  console.log(restaurant);

  try {
    const q = query(
      collection(db, 'orders'),
      where('restaurant_id', '==', restaurant),
      where('status', '!=', 'Collected'), //handle in server
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // 2. Map the order data from the documents
      const orderData = querySnapshot.docs.map((item) => item.data());

      // console.log(orderData);

      return NextResponse.json({ orderData }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No completed orders found for the restaurant' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}


export async function PATCH(request) {
  const body = await request.json();
  const { id, newStatus } = body;

  console.log('id:', id);
  console.log('new status: ', newStatus);

  const q = query(collection(db, "orders"), where("id", "==", id), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length > 0) {
    const orderRef = querySnapshot.docs[0].ref;

    try {
      await updateDoc(orderRef, { status: newStatus });
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to change order status' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
}