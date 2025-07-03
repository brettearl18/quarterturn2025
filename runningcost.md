# RunningCost.md

## 💸 Running Cost Audit: Quarter Turn Marketplace

_Last updated: [Insert Date]_  
_This document tracks and forecasts infrastructure and operational costs as the platform grows._

---

## 1. Core Cost Categories

- **Frontend Hosting:** Vercel (or similar)
- **Backend/Database:** Firebase (Firestore, Auth, Storage)
- **Image/Asset Storage:** Firebase Storage
- **Authentication:** Firebase Auth
- **APIs:** OpenAI (AI Coach Finder), other 3rd party APIs
- **Bandwidth/Egress:** Firebase, Vercel
- **Email/Notifications:** (Add provider if used)
- **Domain/SSL:** (e.g., Namecheap, Google Domains)
- **Other SaaS/Tools:** (Add as needed)

---

## 2. Cost Drivers

- **Monthly Active Users (MAU)**
- **Number of Coaches/Clients**
- **Leads/Enquiries per month**
- **Images/Uploads (profile, gallery)**
- **API Usage (OpenAI, etc.)**
- **Storage (Firestore, Storage)**
- **Bandwidth (image delivery, page loads)**

---

## 3. Baseline Monthly Cost (Low Usage)

| Service         | Free Tier? | Est. Cost (Low) | Notes |
|-----------------|------------|-----------------|-------|
| Vercel Hosting  | Yes        | $0              | Hobby/Dev tier |
| Firebase Auth   | Yes        | $0              | 10k MAU free |
| Firestore DB    | Yes        | $0-$5           | 1 GiB storage, 50k reads/day free |
| Firebase Storage| Yes        | $0-$5           | 5 GiB free, $0.026/GB/mo |
| OpenAI API      | No         | $5+             | Based on usage (see below) |
| Domain/SSL      | No         | $1-2            | Per month |
| Email/SMS       | Maybe      | $0-10           | If using 3rd party |
| **Total**       |            | **$5-20**       | For dev/small prod |

---

## 4. Forecasting Table

| Users/Month | Firestore Reads | Storage (GB) | OpenAI API Calls | Est. Monthly Cost |
|-------------|----------------|--------------|------------------|-------------------|
| 100         | 10k            | 1            | 100              | $5-10             |
| 1,000       | 100k           | 5            | 1,000            | $10-30            |
| 10,000      | 1M             | 20           | 10,000           | $50-150           |
| 100,000     | 10M            | 100          | 100,000          | $300-1,000+       |

**Notes:**
- Firestore: $0.18/100k reads, $0.026/GB storage/month
- OpenAI: $0.002-$0.03 per call (depends on model/length)
- Storage: $0.026/GB/month (Firebase)
- Bandwidth: $0.15/GB (after free tier)

---

## 5. Optimization & Recommendations

- **Monitor Firestore reads/writes:** Use batched reads, cache where possible.
- **Image optimization:** Use thumbnails, compress images before upload.
- **OpenAI API:** Limit prompt/response size, cache results if possible.
- **Storage:** Clean up unused images/files.
- **Upgrade plans as you grow:** Move to Blaze (pay-as-you-go) for Firebase when needed.
- **Set up budget alerts:** In Firebase and Vercel dashboards.

---

## 6. To-Do / Next Steps
- [ ] Add real usage metrics as you grow
- [ ] Review costs monthly
- [ ] Add new services as integrated (email, SMS, etc.)

---

_This file should be updated regularly as the platform scales and new features/services are added._ 