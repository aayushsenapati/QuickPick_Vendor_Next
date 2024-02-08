import { NextResponse } from 'next/server';
import {auth,db} from '@/app/firebase/config';



export async function DELETE(request) {
  const body = await request.json();
  const { email } = body;

  try {
    // Get user by email
    const userRecord = await auth.getUserByEmail(email);

    // Delete user from Firebase Authentication
    await auth.deleteUser(userRecord.uid);

    // Delete user document from 'users' collection
    await db.collection('users').doc(userRecord.uid).delete();

    // Delete user's orders from 'orders' collection
    const ordersSnapshot = await db.collection('orders').where('user_id', '==', userRecord.uid).get();
    ordersSnapshot.forEach((doc) => {
      db.collection('orders').doc(doc.id).delete();
    });

    return NextResponse.json({ success: true }, { status: 200 }); // No Content
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}