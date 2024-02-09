import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

export async function DELETE(request) {
  const body = await request.json();
  const { email } = body;

  try {
    // Get user by email
    const userRecord = await admin.auth().getUserByEmail(email);

    // Delete user from Firebase Authentication
    await admin.auth().deleteUser(userRecord.uid);

    // Delete user document from 'users' collection
    await admin.firestore().collection('users').doc(userRecord.uid).delete();

    // Delete user's orders from 'orders' collection
    const ordersSnapshot = await admin.firestore().collection('orders').where('user_id', '==', userRecord.uid).get();
    ordersSnapshot.forEach((doc) => {
      admin.firestore().collection('orders').doc(doc.id).delete();
    });

    return NextResponse.json({ success: true }, { status: 200 }); // No Content
  } catch (error) {
    console.error("EERRRRORRRRRRR", error);
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}