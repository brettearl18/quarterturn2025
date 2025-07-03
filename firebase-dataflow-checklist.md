# Firebase Dataflow Checklist

| Dataflow                                      | Status      | Notes                                                      |
|-----------------------------------------------|-------------|------------------------------------------------------------|
| 1. Fetch Professionals (Directory)            | ✅          | Firestore professionals loaded and merged with mock data   |
| 2. Fetch Coach Profile Details                | ✅/❌       | Scaffolded; some data fetched, but full detail not complete|
| 3. Submit Enquiry (Connect with Coach)        | ✅          | Enquiries written to Firestore                             |
| 4. Fetch Enquiries (Coach/Admin Dashboard)    | ✅          | Leads/enquiries table pulls from Firestore                 |
| 5. Edit Coach Profile (Save to Firestore)     | ✅          | Profile form loads/saves to Firestore                      |
| 6. AI Coach Finder (OpenAI, not Firebase)     | ✅          | Uses OpenAI API, not Firestore                             |
| 7. Booking Flow (Create/Read Bookings)        | ❌          | Not implemented yet                                        |
| 8. Reviews (Create/Read Reviews)              | ❌          | Not implemented yet                                        |
| 9. User Accounts (Auth, Favorites, History)   | ❌          | No real authentication or user data yet                    |
| 10. Real-time Availability (Status/Slots)     | ❌          | No real-time availability data in Firestore                |
| 11. Admin/Professional Onboarding Dashboard   | ❌          | Not implemented yet                                        |

---

**Legend:**
- ✅ = Connected to Firestore and working
- ❌ = Not yet connected/implemented
- ✅/❌ = Partially connected or scaffolded 