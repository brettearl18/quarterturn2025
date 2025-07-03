# Fitness Directory Platform - Dataflows (Mermaid.js)

## 1. User Browsing & Coach Directory

```mermaid
flowchart TD
    A[User] -->|Visits| B[Home/Directory Page]
    B -->|Fetches| C[Firestore: Professionals Collection]
    C -->|Returns| D[Coach List (Mock + Real)]
    D -->|Displays| E[Directory UI]
    E -->|User Filters/Sorts| D
    E -->|Clicks Coach| F[Coach Profile Modal/Page]
    F -->|Fetches| G[Firestore: Coach Details]
    G -->|Returns| H[Profile Data]
```

---

## 2. Connect with Coach (Enquiry Flow)

```mermaid
flowchart TD
    A[User] -->|Clicks 'Connect with Coach'| B[Coach Profile Modal]
    B -->|Fills Enquiry Form| C[Submit Enquiry]
    C -->|Writes| D[Firestore: Enquiries Collection]
    D -->|Notifies| E[Coach/Admin Dashboard]
    E -->|Coach Views| F[Enquiry Details]
```

---

## 3. AI Coach Finder

```mermaid
flowchart TD
    A[User] -->|Describes Needs| B[AI Coach Finder Sidebar]
    B -->|Sends Prompt| C[OpenAI API]
    C -->|Returns Matches| D[Match Results]
    D -->|Displays| E[Recommended Coaches]
    E -->|User Clicks| F[Coach Profile Modal/Page]
```

---

## 4. Coach Dashboard (Leads/Enquiries)

```mermaid
flowchart TD
    A[Coach] -->|Logs In| B[Coach Dashboard]
    B -->|Fetches| C[Firestore: Enquiries Collection]
    C -->|Filters by Coach ID| D[Coach's Leads]
    D -->|Displays| E[Leads Table]
    E -->|Clicks Lead| F[Enquiry Detail Modal]
```

---

## 5. Profile Editing (Coach)

```mermaid
flowchart TD
    A[Coach] -->|Edits Profile| B[Profile Form]
    B -->|Submits| C[Firestore: Professionals Collection]
    C -->|Updates| D[Profile Data]
    D -->|Reflects| E[Directory/Profile Page]
``` 