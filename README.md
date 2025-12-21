# IUDX Consent Flow - React Native Demo

A mobile-first implementation of the **IUDX (Indian Urban Data Exchange)** consent-driven data sharing system, built with React Native and Expo.

## 🎯 Project Overview

This app demonstrates the core IUDX semantics:

### 1. Locker
- A user's secure data container
- Owns files and metadata
- A user can have multiple lockers

### 2. Connection
- A logical link between two lockers
- Defines who can access whose data
- **No data flows without an active connection**

### 3. Consent Artefact
- A permission slip granted by the data owner
- Always belongs to one locker (owner) and one connection (receiver)
- Specifies: what data, for what purpose, for how long, under what conditions
- **Not the actual data** - just the permission to access it

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Press 'w' for web or scan QR code with Expo Go app
```

---

## 📱 Testing the App

### Prerequisites
- Node.js >= 20.x
- Expo Go app on your mobile device

### Testing Flow

1. **View Connection Status**
   - See the connection between LIC Insurance (Host) and Kaveri Hospital (Guest)
   - Status badge shows "Established" in green

2. **Switch User View**
   - Tap the blue user badge to switch between Host and Guest perspectives
   - Each role sees different obligations

3. **Select Resource (Provider Flow)**
   - As the Provider role, tap "Select Resource" on a Pending obligation
   - Choose a resource from your Locker
   - Submit to generate a Consent Artefact

4. **Approve/Reject Consent (Requester Flow)**
   - Switch to the opposite role
   - View the Consent Artefact
   - Approve or Reject the data sharing request

5. **Revoke Connection**
   - Tap "Revoke Connection" to disable all data sharing
   - Observe: all action buttons are disabled
   - This proves: **no data flows without an active connection**

---

## 🏗️ Architecture

```
lib/iudx/
├── types.ts      # TypeScript interfaces
├── data.ts       # Mock data
├── reducer.ts    # State machine logic
└── index.ts      # Exports

components/iudx/
├── StatusBadge.tsx       # Status indicators
├── ConnectionHeader.tsx  # Connection info display
├── TabSelector.tsx       # Tab navigation
├── ObligationsTable.tsx  # Table-style obligations list
├── ResourceModal.tsx     # Resource selection
├── ConsentModal.tsx      # Consent artefact viewer
└── ActionBar.tsx         # Connection controls

app/(tabs)/
├── index.tsx     # Main Connection Hub screen
└── explore.tsx   # IUDX Semantics documentation
```

---

## 🎨 Design System

- **Light/Dark Mode**: Full support with proper color contrast
- **Professional Color Palette**: Blue primary, with success/warning/danger states
- **Table-based Layout**: Matching reference UI design
- **Mobile-first**: Optimized for touch interactions

---

## 📋 State Machine

```
Pending → [Select Resource] → Fulfilled → [Approve/Reject] → Approved/Rejected
                                              ↑
                                    Consent Artefact generated
```

---

## ⚠️ Demo Limitations

- Mock data only (no backend API)
- "Select Resource" links metadata, doesn't upload files
- Single connection demo (Host ↔ Guest)
- Reset button restores initial state

---

## 🔑 Key Implementation Points

1. **No data flows without Connection** - Actions disabled when revoked
2. **Bidirectional obligations** - Both parties can be Provider or Requester
3. **Consent Artefact generation** - Auto-generated on resource selection
4. **Role-based views** - Different actions for Provider vs Requester
5. **State machine integrity** - Proper status transitions enforced

---

## 📄 License

MIT
