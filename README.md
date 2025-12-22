# IUDX Consent Manager

A React Native reference implementation of the IUDX (Indian Urban Data Exchange) consent-driven data sharing protocol. This application demonstrates the secure flow of data between organizations using the core IUDX concepts of Lockers, Connections, and Consent Artefacts.

## Project Overview

The application simulates a healthcare data exchange scenario between two entities:
*   **LIC Insurance** (Host Organization)
*   **Kaveri Hospital** (Guest Organization)

It implements a bidirectional consent flow where either party can act as a Data Provider or Data Consumer depending on the specific obligation (e.g., sharing a policy document vs. requesting a medical record).

## Key Features

### 1. Connection Hub
The central dashboard provides a real-time view of the connection status.
*   **Role Switching**: Users can toggle between Host and Guest roles to experience the workflow from both perspectives.
*   **Visual Status**: A pulse animation indicates an active, secure connection.
*   **Metrics**: Quick summary of pending and active data sharing agreements.

### 2. Obligation Management (Bento Grid Layout)
Data sharing duties are organized into a modern card-based list.
*   **Provider Flow**: Select resources from a secure locker to fulfill an obligation.
*   **Consumer Flow**: Review, approve, or reject received Consent Artefacts.
*   **Filtering**: Tabs to segregate "Shared by me" vs. "Received from partner".

### 3. IUDX Semantics Implementation
*   **Locker**: A secure container for resources.
*   **Connection**: A logical link defining access rights. No data flows without an active connection.
*   **Consent Artefact**: A digital permission slip specifying data scopes, purposes, and validity.

### 4. Modern UI/UX
*   **Typography**: Uses the **Outfit** Google Font family for a clean, professional aesthetic.
*   **Design System**: centralized theme management (`constants/theme.ts`) with standardized spacing, radius, and shadows.
*   **Responsive**: Optimized for both mobile (iOS/Android) and Web platforms.

## Technical Stack

*   **Framework**: React Native (via Expo)
*   **Language**: TypeScript
*   **Routing**: Expo Router
*   **Styling**: StyleSheet API with Custom Design Tokens
*   **State Management**: React `useReducer` for complex state transitions
*   **Fonts**: `@expo-google-fonts/outfit`

## Getting Started

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npx expo start
    ```

4.  Run on device/emulator:
    *   Press `w` for Web
    *   Press `i` for iOS Simulator
    *   Press `a` for Android Emulator
    *   Scan the QR code with the **Expo Go** app on a physical device

## Project Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Main Connection Hub Controller
│   └── explore.tsx        # Semantics Reference Screen
├── _layout.tsx            # Global Layout & Font Loading
└── ...

components/
└── iudx/
    ├── ConnectionHeader.tsx   # Dashboard Header with Animation
    ├── ObligationsList.tsx    # Card-based List Component
    ├── ObligationCard.tsx     # Individual Task Item
    ├── ResourceModal.tsx      # Resource Selection Interface
    ├── ConsentModal.tsx       # Consent Artefact Viewer
    ├── HeaderLogo.tsx         # Custom App Branding
    └── ...

lib/iudx/
├── types.ts               # Core TypeScript definitions
├── data.ts                # Mock Data & Initial State
└── reducer.ts             # State Machine Logic
```

## State Machine
The application logic enforces strict transitions to ensure data integrity:

`Pending` -> `Provider Selects Resource` -> `Fulfilled` -> `Consumer Decides` -> `Approved` / `Rejected`

## License

MIT
