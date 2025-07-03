require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { getAuth, signInWithEmailAndPassword, signOut } = require('firebase/auth');

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Verify config
console.log('Checking Firebase configuration...');
Object.entries(firebaseConfig).forEach(([key, value]) => {
  if (!value) {
    console.error(`❌ Missing ${key} in environment variables`);
    process.exit(1);
  }
});
console.log('✅ Firebase configuration verified\n');

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);

// Test data
const testFile = new Blob(['test content'], { type: 'text/plain' });
const testImage = new Blob(['fake image data'], { type: 'image/jpeg' });

async function runTests() {
  console.log('Starting storage rules tests...\n');

  // Test 1: Unauthenticated user trying to read files
  console.log('Test 1: Unauthenticated user reading files');
  try {
    const publicRef = ref(storage, 'professionals/test-user/profile.jpg');
    await getDownloadURL(publicRef);
    console.log('✅ Success: Unauthenticated user can read public files');
  } catch (error) {
    console.log('❌ Error: Unauthenticated user cannot read public files:', error.message);
  }

  // Test 2: Unauthenticated user trying to write files
  console.log('\nTest 2: Unauthenticated user writing files');
  try {
    const publicRef = ref(storage, 'professionals/test-user/profile.jpg');
    await uploadBytes(publicRef, testImage);
    console.log('❌ Error: Unauthenticated user was able to write files');
  } catch (error) {
    console.log('✅ Success: Unauthenticated user cannot write files');
  }

  // Test 3: Authenticated user writing to their own profile
  console.log('\nTest 3: Authenticated user writing to own profile');
  try {
    // Sign in as a test user
    await signInWithEmailAndPassword(auth, 'test@example.com', 'password123');
    const userRef = ref(storage, `professionals/${auth.currentUser.uid}/profile.jpg`);
    await uploadBytes(userRef, testImage);
    console.log('✅ Success: Authenticated user can write to their own profile');
  } catch (error) {
    console.log('❌ Error: Authenticated user cannot write to their own profile:', error.message);
  }

  // Test 4: Authenticated user writing to another user's profile
  console.log('\nTest 4: Authenticated user writing to another user\'s profile');
  try {
    const otherUserRef = ref(storage, 'professionals/other-user/profile.jpg');
    await uploadBytes(otherUserRef, testImage);
    console.log('❌ Error: User was able to write to another user\'s profile');
  } catch (error) {
    console.log('✅ Success: User cannot write to another user\'s profile');
  }

  // Test 5: Vendor writing product images
  console.log('\nTest 5: Vendor writing product images');
  try {
    // Sign in as a vendor
    await signInWithEmailAndPassword(auth, 'vendor@example.com', 'password123');
    const productRef = ref(storage, 'products/test-product/image.jpg');
    await uploadBytes(productRef, testImage);
    console.log('✅ Success: Vendor can write product images');
  } catch (error) {
    console.log('❌ Error: Vendor cannot write product images:', error.message);
  }

  // Test 6: Non-vendor writing product images
  console.log('\nTest 6: Non-vendor writing product images');
  try {
    // Sign in as a regular user
    await signInWithEmailAndPassword(auth, 'user@example.com', 'password123');
    const productRef = ref(storage, 'products/test-product/image.jpg');
    await uploadBytes(productRef, testImage);
    console.log('❌ Error: Non-vendor was able to write product images');
  } catch (error) {
    console.log('✅ Success: Non-vendor cannot write product images');
  }

  // Cleanup
  await signOut(auth);
  console.log('\nTests completed!');
}

// Run the tests
runTests().catch(console.error); 