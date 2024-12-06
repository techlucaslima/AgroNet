import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUkHBHDE-b0k2zsxMGOPJb3MtI_XHD9gc",
  authDomain: "ecommerce-agricultura.firebaseapp.com",
  projectId: "ecommerce-agricultura",
  storageBucket: "ecommerce-agricultura.firebasestorage.app",
  messagingSenderId: "405031151007",
  appId: "1:405031151007:web:9f75720d6890d8b8fe49aa",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Add these Firestore rules in Firebase Console:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                   get(/databases/$(database)/documents/users/$(request.auth.uid)).data.userType == 'farmer';
    }
    
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /orders/{orderId} {
      allow read: if request.auth != null && (
        request.auth.uid == resource.data.userId ||
        resource.data.items[0].farmerId == request.auth.uid
      );
      allow create: if request.auth != null;
    }
  }
}
*/