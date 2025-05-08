const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const seedData = require('./seedFirestore.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seedCollection(collectionName, documents) {
  for (const doc of documents) {
    await db.collection(collectionName).add(doc);
    console.log(`Added to ${collectionName}:`, doc.name || doc);
  }
}

async function main() {
  for (const [collectionName, documents] of Object.entries(seedData)) {
    if (Array.isArray(documents)) {
      await seedCollection(collectionName, documents);
    }
  }
  console.log('Seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error seeding Firestore:', err);
  process.exit(1);
});