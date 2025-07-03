# Firestore Security Rules

These rules are designed for a fitness/coach marketplace. They ensure that only the correct users can read/write their own data, while allowing public access where appropriate (e.g., public coach/professional profiles).

---

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Professionals/Coaches directory: public read, only owner can write
    match /professionals/{coachId} {
      allow read: if true; // Anyone can read
      allow write: if request.auth != null && request.auth.uid == coachId; // Only the coach can write their own profile
    }

    // Coach profiles (if you use a separate collection)
    match /coachProfiles/{coachId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == coachId;
    }

    // Coaches collection (for onboarding/auth)
    match /coaches/{coachId} {
      allow read: if request.auth != null && request.auth.uid == coachId;
      allow write: if request.auth != null && request.auth.uid == coachId;
    }

    // Users collection (for general users)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Leads/enquiries: anyone can create, only coach or admin can read/update/delete
    match /coachLeads/{leadId} {
      allow create: if true; // Anyone can submit an enquiry
      allow read, update, delete: if request.auth != null && (
        resource.data.coachId == request.auth.uid ||
        request.auth.token.admin == true // If you use custom claims for admin
      );
    }

    // Reviews: anyone can read, only authenticated users can create, no updates/deletes
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if false;
    }

    // Products: public read, only vendor can write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == resource.data.vendorId;
    }

    // Vendors: only vendor can read/write their own doc
    match /vendors/{vendorId} {
      allow read, write: if request.auth != null && request.auth.uid == vendorId;
    }

    // Add other collections as needed, following the same pattern
  }
}
```

---

## Explanations

- **/professionals, /coachProfiles, /coaches:** Only the authenticated user with matching UID can write their own doc. Public can read professional/coach profiles.
- **/coachLeads:** Anyone can create (submit an enquiry), but only the coach (or admin) can read/update/delete.
- **/users:** Only the user can read/write their own doc.
- **/products, /vendors:** Only the vendor can write their own docs/products.
- **/reviews:** Anyone can read, only authenticated users can create, no updates/deletes allowed.

> Adjust/add collections as needed for your app's structure and privacy needs. 