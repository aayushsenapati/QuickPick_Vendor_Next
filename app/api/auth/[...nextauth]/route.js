import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase/config";

const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email || "",
            credentials.password || ""
          );
          if (userCredential.user) {
            const email = userCredential.user.email;

            // After successful sign-in, check if the vendor already exists
            const q = query(collection(db, "vendor"), where("email", "==", email));
            const vendorSnapshot = await getDocs(q);

            if (vendorSnapshot.empty) {
              // If the vendor does not exist, add a new vendor with the email and an empty restaurants array
              try {
                await addDoc(collection(db, "vendor"), {
                  email: email,
                  restaurants: [],
                });
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }

            return userCredential.user;
          }
          return null;
        } catch (error) {
          console.error(error);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };