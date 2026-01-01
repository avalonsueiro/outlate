# 🌙 Outlate - Receipt Splitting App Development Guide

> **Vibe**: Late-night going out with friends. Dark, moody, fun.
> **For**: Cursor AI Development

---

## 📋 Project Overview

**Outlate** is a receipt-splitting app designed for friend groups who go out together. Users can photograph receipts, itemize them, assign costs to attendees, and calculate who owes whom—with a built-in credit system for tracking paybacks.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18+, Next.js 14+ (App Router) |
| Language | TypeScript (strict mode) |
| Backend | Node.js with Next.js API Routes |
| Styling | Tailwind CSS |
| State | React Context + useReducer (or Zustand) |
| **Database** | **Firebase Firestore** |
| **Auth** | **Firebase Authentication** |
| **Storage** | **Firebase Storage** (receipt images) |
| **OCR/Vision** | **OpenAI GPT-4o mini** (receipt parsing) |

---

## 🎨 Design System

### Color Palette (DARK MODE ONLY)

```css
:root {
  /* Background Colors */
  --bg-primary: #0D0D0D;      /* Main background - near black */
  --bg-secondary: #1A1A1A;    /* Cards, elevated surfaces */
  --bg-tertiary: #252525;     /* Input fields, subtle elevation */
  
  /* Accent Colors */
  --accent-primary: #4F1787;  /* Deep purple - primary actions */
  --accent-secondary: #FB773C; /* Vibrant orange - highlights, CTAs */
  
  /* Accent Variations */
  --accent-primary-hover: #6B1FB0;
  --accent-primary-muted: rgba(79, 23, 135, 0.3);
  --accent-secondary-hover: #FF8F5A;
  --accent-secondary-muted: rgba(251, 119, 60, 0.3);
  
  /* Text Colors */
  --text-primary: #FFFFFF;
  --text-secondary: #A0A0A0;
  --text-muted: #666666;
  
  /* Utility Colors */
  --success: #22C55E;
  --error: #EF4444;
  --warning: #F59E0B;
  
  /* Borders & Dividers */
  --border-subtle: #2A2A2A;
  --border-default: #3A3A3A;
}
```

### Typography

```css
/* Fonts are located in /public/fonts/ */

@font-face {
  font-family: 'HIMSSANS';
  src: url('/fonts/hymned_sans.otf') format('opentype');
}

@font-face {
  font-family: 'Jabour';
  src: url('/fonts/jabore.otf') format('opentype');
}

:root {
  --font-heading: 'HIMSSANS', sans-serif;  /* Headings & accents */
  --font-body: 'Jabour', sans-serif;       /* Body text */
}

/* Typography Scale */
h1 { font-family: var(--font-heading); font-size: 2.5rem; font-weight: 700; }
h2 { font-family: var(--font-heading); font-size: 2rem; font-weight: 600; }
h3 { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 600; }
h4 { font-family: var(--font-heading); font-size: 1.25rem; font-weight: 500; }
body { font-family: var(--font-body); font-size: 1rem; line-height: 1.6; }
.label { font-family: var(--font-heading); font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
```

### Component Styling Guidelines

```
Buttons:
- Primary: bg-accent-secondary (#FB773C), text-white, rounded-xl, py-3 px-6
- Secondary: bg-accent-primary (#4F1787), text-white, rounded-xl
- Ghost: transparent border, border-accent-primary, text-accent-secondary
- All buttons: subtle glow/shadow on hover using accent colors

Cards:
- bg-secondary (#1A1A1A)
- rounded-2xl
- border border-subtle
- p-6
- Optional: subtle gradient border using both accent colors

Inputs:
- bg-tertiary (#252525)
- border-subtle on default
- border-accent-secondary on focus
- rounded-xl
- text-primary

Modals/Overlays:
- Semi-transparent bg-primary with blur backdrop
- Centered card with accent gradient border
```

### Visual Effects

```
- Subtle gradients using accent colors for emphasis
- Glow effects on interactive elements (box-shadow with accent colors)
- Smooth transitions (150-300ms ease)
- Micro-animations for feedback (button presses, loading states)
- Consider subtle grain/noise texture overlay for that late-night vibe
```

---

## 👥 Team Responsibilities

### Developer A (Auth & Core Setup)
- Project initialization & configuration
- Authentication flow (Sign In/Sign Up)
- Navigation & layout components
- Outing creation & people management
- Design system implementation

### Developer B (Receipt & Calculation Logic)
- Receipt upload & camera functionality
- Receipt itemization interface
- Item assignment & splitting logic
- Calculation engine
- Results & sharing screens

---

## 🔄 Development Workflow

### UI-First Approach

> ⚠️ **CRITICAL**: Phases 1-6 are **UI ONLY** with mocked data. No Firebase, no APIs, no backend. Just beautiful screens that work with fake data. Backend integration happens in Phase 7 AFTER all UI is complete and approved.

### For Each UI Phase (1-6):

1. **Build UI** - Create all screens with mocked data/functionality
2. **Mock Everything** - Use `src/lib/mock-data.ts` for all data
3. **Navigation Works** - All buttons navigate to correct screens (even if data isn't real)
4. **Review Checkpoint** - Both developers run the app together:
   - ✅ Confirm user stories are met visually
   - ✅ Verify design matches vision (dark mode, colors, fonts)
   - ✅ Test responsive behavior
   - ✅ Check component consistency
   - ✅ All interactions feel smooth
5. **Sign Off** - Both developers approve before moving to next phase

### After All UI Phases Complete (Phase 7):

1. **Set Up Firebase** - Auth, Firestore, Storage
2. **Set Up GPT-4o mini** - Receipt processing API
3. **Replace Mocks** - Swap mock data for real Firebase calls
4. **Test Everything** - Full end-to-end testing

---

## 📱 User Flow

```
Sign In
    ↓
Dashboard (Previous Outings)
    ↓
Click "New Outing"
    ↓
Add People (Names)
    ↓
Upload Receipts (Batch)
    ↓
┌─────────────────────────────────────┐
│  FOR EACH RECEIPT:                  │
│  1. System itemizes receipt (OCR)   │
│  2. User confirms/edits items       │
│  3. Select who was there            │
│  4. Define who paid                 │
│  5. Choose split method:            │
│     - Equal split (select people)   │
│     - By items (assign to people)   │
│  6. Handle tax/tip allocation       │
└─────────────────────────────────────┘
    ↓
Calculate Final Amounts
    ↓
Present: Who Owes Whom
    ↓
Share Breakdown / Record Credits
```

---

## 🚀 PHASE 0: Project Initialization (UI Foundation Only)

**Owner**: Developer A

### Tasks:

```bash
# Create Next.js project
npx create-next-app@latest outlate --typescript --tailwind --eslint --app --src-dir

# Install UI dependencies ONLY (no backend stuff yet)
npm install zustand framer-motion lucide-react
npm install -D @types/node
```

> ⚠️ **IMPORTANT**: We are NOT setting up Firebase, databases, or APIs yet. All phases focus on UI first with mocked data. Backend setup comes in the final integration phase.

### File Structure:

```
outlate/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   │   └── page.tsx
│   │   │   └── sign-up/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── page.tsx              # Home/Dashboard
│   │   │   ├── outing/
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── receipt/
│   │   │   │       │   ├── upload/
│   │   │   │       │   └── [receiptId]/
│   │   │   │       └── results/
│   │   │   └── layout.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── auth/
│   │   ├── outing/
│   │   ├── receipt/
│   │   └── layout/
│   ├── lib/
│   │   ├── mock-data.ts              # All mock data for UI development
│   │   ├── utils.ts
│   │   ├── types.ts
│   │   └── constants.ts
│   ├── hooks/
│   ├── context/
│   └── styles/
├── public/
│   └── fonts/
│       ├── hymned_sans.otf           # Heading font
│       └── jabore.otf                # Body font
└── ...config files
```

### Tailwind Configuration:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // We'll force dark mode
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0D0D0D',
          secondary: '#1A1A1A',
          tertiary: '#252525',
        },
        accent: {
          purple: {
            DEFAULT: '#4F1787',
            hover: '#6B1FB0',
            muted: 'rgba(79, 23, 135, 0.3)',
          },
          orange: {
            DEFAULT: '#FB773C',
            hover: '#FF8F5A',
            muted: 'rgba(251, 119, 60, 0.3)',
          },
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#666666',
        },
        border: {
          subtle: '#2A2A2A',
          default: '#3A3A3A',
        },
      },
      fontFamily: {
        heading: ['var(--font-himssans)', 'sans-serif'],
        body: ['var(--font-jabour)', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(79, 23, 135, 0.5)',
        'glow-orange': '0 0 20px rgba(251, 119, 60, 0.5)',
      },
    },
  },
  plugins: [],
}
export default config
```

### Global CSS Setup:

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: 'HIMSSANS';
  src: url('/fonts/hymned_sans.otf') format('opentype');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Jabour';
  src: url('/fonts/jabore.otf') format('opentype');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-himssans: 'HIMSSANS';
  --font-jabour: 'Jabour';
}

html {
  color-scheme: dark;
}

body {
  @apply bg-background-primary text-text-primary font-body;
  min-height: 100vh;
}

/* Custom scrollbar for dark mode */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-background-secondary;
}

::-webkit-scrollbar-thumb {
  @apply bg-accent-purple rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-accent-purple-hover;
}
```

### TypeScript Types:

```typescript
// src/lib/types.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface Outing {
  id: string;
  name: string;
  date: Date;
  createdBy: string;
  people: Person[];
  receipts: Receipt[];
  settlements: Settlement[];
  status: 'active' | 'settled' | 'archived';
}

export interface Person {
  id: string;
  name: string;
  color?: string; // For visual distinction
}

export interface Receipt {
  id: string;
  outingId: string;
  imageUrl: string;
  vendorName?: string;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  paidBy: string; // Person ID
  splitMethod: 'equal' | 'by-item';
  includedPeople: string[]; // Person IDs for equal split
  processedAt?: Date;
}

export interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  assignedTo: string[]; // Person IDs
}

export interface Settlement {
  id: string;
  outingId: string;
  fromPerson: string;
  toPerson: string;
  amount: number;
  paid: boolean;
  paidAt?: Date;
}

export interface OwingSummary {
  personId: string;
  personName: string;
  totalOwed: number;      // What they owe to others
  totalOwedTo: number;    // What others owe them
  netAmount: number;      // Positive = owes, Negative = is owed
  breakdown: {
    toPersonId: string;
    toPersonName: string;
    amount: number;
  }[];
}
```

### Mock Data File (USE THIS FOR ALL UI PHASES):

```typescript
// src/lib/mock-data.ts
// This file contains ALL mock data for UI development
// DO NOT connect to real APIs until Phase 7

import { User, Outing, Person, Receipt, ReceiptItem, Settlement, OwingSummary } from './types';

// ============ MOCK USER ============
export const mockCurrentUser: User = {
  id: 'user-1',
  email: 'demo@outlate.app',
  name: 'Alex Johnson',
  avatarUrl: undefined,
};

// ============ MOCK PEOPLE (for outings) ============
export const mockPeople: Person[] = [
  { id: 'person-1', name: 'Alex Johnson', color: '#4F1787' },
  { id: 'person-2', name: 'Jordan Smith', color: '#FB773C' },
  { id: 'person-3', name: 'Sam Wilson', color: '#22C55E' },
  { id: 'person-4', name: 'Morgan Lee', color: '#3B82F6' },
];

// ============ MOCK RECEIPT ITEMS ============
export const mockReceiptItems1: ReceiptItem[] = [
  { id: 'item-1', name: 'Margherita Pizza', price: 18.00, quantity: 1, assignedTo: ['person-1', 'person-2'] },
  { id: 'item-2', name: 'Craft Beer', price: 8.00, quantity: 2, assignedTo: ['person-1'] },
  { id: 'item-3', name: 'Caesar Salad', price: 12.00, quantity: 1, assignedTo: ['person-2', 'person-3'] },
  { id: 'item-4', name: 'Tiramisu', price: 9.00, quantity: 1, assignedTo: ['person-3'] },
];

export const mockReceiptItems2: ReceiptItem[] = [
  { id: 'item-5', name: 'Whiskey Sour', price: 14.00, quantity: 2, assignedTo: ['person-1', 'person-4'] },
  { id: 'item-6', name: 'Margarita', price: 13.00, quantity: 1, assignedTo: ['person-2'] },
  { id: 'item-7', name: 'Nachos', price: 16.00, quantity: 1, assignedTo: ['person-1', 'person-2', 'person-3', 'person-4'] },
  { id: 'item-8', name: 'Wings', price: 15.00, quantity: 1, assignedTo: ['person-3', 'person-4'] },
];

// ============ MOCK RECEIPTS ============
export const mockReceipts: Receipt[] = [
  {
    id: 'receipt-1',
    outingId: 'outing-1',
    imageUrl: '/mock/receipt-1.jpg',
    vendorName: "Luigi's Pizzeria",
    items: mockReceiptItems1,
    subtotal: 55.00,
    tax: 4.95,
    tip: 11.00,
    total: 70.95,
    paidBy: 'person-1',
    splitMethod: 'by-item',
    includedPeople: ['person-1', 'person-2', 'person-3'],
    processedAt: new Date('2024-01-15T21:30:00'),
  },
  {
    id: 'receipt-2',
    outingId: 'outing-1',
    imageUrl: '/mock/receipt-2.jpg',
    vendorName: 'The Night Owl Bar',
    items: mockReceiptItems2,
    subtotal: 72.00,
    tax: 6.48,
    tip: 14.40,
    total: 92.88,
    paidBy: 'person-2',
    splitMethod: 'equal',
    includedPeople: ['person-1', 'person-2', 'person-3', 'person-4'],
    processedAt: new Date('2024-01-15T23:45:00'),
  },
];

// ============ MOCK SETTLEMENTS ============
export const mockSettlements: Settlement[] = [
  { id: 'settlement-1', outingId: 'outing-1', fromPerson: 'person-3', toPerson: 'person-1', amount: 18.50, paid: false },
  { id: 'settlement-2', outingId: 'outing-1', fromPerson: 'person-4', toPerson: 'person-2', amount: 23.22, paid: false },
  { id: 'settlement-3', outingId: 'outing-1', fromPerson: 'person-1', toPerson: 'person-2', amount: 12.35, paid: true, paidAt: new Date('2024-01-16T10:00:00') },
];

// ============ MOCK OUTINGS ============
export const mockOutings: Outing[] = [
  {
    id: 'outing-1',
    name: 'Friday Night Dinner',
    date: new Date('2024-01-15'),
    createdBy: 'user-1',
    people: mockPeople.slice(0, 4),
    receipts: mockReceipts,
    settlements: mockSettlements,
    status: 'active',
  },
  {
    id: 'outing-2',
    name: "Sam's Birthday",
    date: new Date('2024-01-08'),
    createdBy: 'user-1',
    people: mockPeople.slice(0, 3),
    receipts: [],
    settlements: [],
    status: 'settled',
  },
  {
    id: 'outing-3',
    name: 'New Year Eve Party',
    date: new Date('2023-12-31'),
    createdBy: 'user-1',
    people: mockPeople,
    receipts: [],
    settlements: [],
    status: 'archived',
  },
];

// ============ MOCK OCR/AI RESPONSE (simulates GPT-4o mini) ============
export const mockOCRResponse = {
  vendorName: "Tony's Tavern",
  items: [
    { name: 'Burger Deluxe', price: 16.99, quantity: 1 },
    { name: 'Fish & Chips', price: 18.50, quantity: 1 },
    { name: 'IPA Draft', price: 7.00, quantity: 3 },
    { name: 'Onion Rings', price: 8.99, quantity: 1 },
  ],
  subtotal: 65.48,
  tax: 5.89,
  tip: 13.10,
  total: 84.47,
};

// ============ MOCK OWING SUMMARY ============
export const mockOwingSummary: OwingSummary[] = [
  {
    personId: 'person-1',
    personName: 'Alex Johnson',
    totalOwed: 12.35,
    totalOwedTo: 18.50,
    netAmount: -6.15, // Is owed $6.15
    breakdown: [
      { toPersonId: 'person-2', toPersonName: 'Jordan Smith', amount: 12.35 },
    ],
  },
  {
    personId: 'person-2',
    personName: 'Jordan Smith',
    totalOwed: 0,
    totalOwedTo: 35.57,
    netAmount: -35.57, // Is owed $35.57
    breakdown: [],
  },
  {
    personId: 'person-3',
    personName: 'Sam Wilson',
    totalOwed: 18.50,
    totalOwedTo: 0,
    netAmount: 18.50, // Owes $18.50
    breakdown: [
      { toPersonId: 'person-1', toPersonName: 'Alex Johnson', amount: 18.50 },
    ],
  },
  {
    personId: 'person-4',
    personName: 'Morgan Lee',
    totalOwed: 23.22,
    totalOwedTo: 0,
    netAmount: 23.22, // Owes $23.22
    breakdown: [
      { toPersonId: 'person-2', toPersonName: 'Jordan Smith', amount: 23.22 },
    ],
  },
];

// ============ HELPER FUNCTIONS FOR MOCKING ============

// Simulate async API call delay
export const mockDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Mock sign in (always succeeds)
export const mockSignIn = async (email: string, password: string): Promise<User> => {
  await mockDelay(1000);
  return mockCurrentUser;
};

// Mock sign up (always succeeds)
export const mockSignUp = async (email: string, password: string, name: string): Promise<User> => {
  await mockDelay(1000);
  return { ...mockCurrentUser, email, name };
};

// Mock sign out
export const mockSignOut = async (): Promise<void> => {
  await mockDelay(500);
};

// Mock get outings
export const mockGetOutings = async (): Promise<Outing[]> => {
  await mockDelay(600);
  return mockOutings;
};

// Mock get single outing
export const mockGetOuting = async (id: string): Promise<Outing | null> => {
  await mockDelay(400);
  return mockOutings.find(o => o.id === id) || null;
};

// Mock create outing
export const mockCreateOuting = async (name: string, date: Date): Promise<Outing> => {
  await mockDelay(800);
  return {
    id: `outing-${Date.now()}`,
    name,
    date,
    createdBy: mockCurrentUser.id,
    people: [],
    receipts: [],
    settlements: [],
    status: 'active',
  };
};

// Mock process receipt (simulates GPT-4o mini OCR)
export const mockProcessReceipt = async (file: File): Promise<typeof mockOCRResponse> => {
  await mockDelay(2000); // Simulate AI processing time
  return mockOCRResponse;
};

// Mock image upload (returns fake URL)
export const mockUploadImage = async (file: File): Promise<string> => {
  await mockDelay(1000);
  return `/mock/uploaded-${Date.now()}.jpg`;
};
```

### Mock Auth Context (for UI phases):

```typescript
// src/context/MockAuthContext.tsx
// Use this during UI phases - will be replaced with real Firebase auth in Phase 7

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/types';
import { mockCurrentUser, mockSignIn, mockSignUp, mockSignOut, mockDelay } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const user = await mockSignIn(email, password);
    setUser(user);
    setLoading(false);
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    const user = await mockSignUp(email, password, name);
    setUser(user);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await mockSignOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within MockAuthProvider');
  }
  return context;
}
```

### ✅ Phase 0 Checkpoint

Before proceeding, both developers confirm:
- [ ] Project runs with `npm run dev`
- [ ] Fonts are loading correctly
- [ ] Dark mode colors are applied
- [ ] Tailwind config is properly set up
- [ ] File structure is in place
- [ ] Types are defined

---

## 🚀 PHASE 1: Authentication & Layout (UI Only)

**Owner**: Developer A

> 🎨 **UI ONLY** - Use `mockSignIn`, `mockSignUp` from mock-data.ts. No real auth yet.

### Screens to Build:

#### 1.1 Sign In Page (`/sign-in`)

**User Story**: As a user, I can sign in to access my outings and history.

**UI Requirements**:
- Full-screen dark background with subtle gradient
- Centered card with app logo/name "Outlate" in HIMSSANS
- Tagline: "Split the night, not friendships" (or similar)
- Email input field
- Password input field
- "Sign In" button (accent-orange)
- "Don't have an account? Sign up" link
- Optional: Social sign-in buttons (Google, Apple)
- Subtle animated background (optional - floating shapes with accent colors)

**Mock for UI Phase**:
```typescript
// Just navigate to dashboard on button click
const handleSignIn = () => {
  router.push('/dashboard');
};
```

#### 1.2 Sign Up Page (`/sign-up`)

**User Story**: As a new user, I can create an account.

**UI Requirements**:
- Same layout as sign-in
- Name input
- Email input
- Password input
- Confirm password input
- "Create Account" button
- "Already have an account? Sign in" link

#### 1.3 Main Layout (`/layout.tsx`)

**UI Requirements**:
- Bottom navigation bar (mobile) / Side navigation (desktop)
- Nav items: Home, New Outing, History, Profile
- Active state uses accent-orange
- Inactive uses text-muted
- Smooth page transitions

#### 1.4 Dashboard/Home Page (`/dashboard`)

**User Story**: As a user, I can see my active and past outings.

**UI Requirements**:
- Header: "Welcome back, [Name]" in HIMSSANS
- "New Outing" prominent CTA button (accent-orange, with glow effect)
- Section: "Active Outings" - cards showing ongoing outings
- Section: "Recent History" - completed outings
- Empty state if no outings: Illustration + "Start your first outing"

**Outing Card Design**:
- Outing name (HIMSSANS)
- Date
- Number of people (avatars/icons)
- Total amount
- Status badge
- Subtle gradient border using accent colors

**Mock Data**:
```typescript
const mockOutings: Outing[] = [
  {
    id: '1',
    name: 'Friday Night Dinner',
    date: new Date('2024-01-15'),
    people: [{ id: '1', name: 'Alex' }, { id: '2', name: 'Jordan' }],
    status: 'active',
    // ... rest of fields
  },
  // Add 2-3 more mock outings
];
```

### ✅ Phase 1 Checkpoint

Both developers review:
- [ ] Sign in page matches dark mode design
- [ ] Sign up page is consistent with sign in
- [ ] Fonts display correctly (HIMSSANS for headings, Jabour for body)
- [ ] Accent colors are used appropriately
- [ ] Dashboard shows mock outings
- [ ] Navigation works between pages
- [ ] Responsive on mobile and desktop
- [ ] Empty states are designed
- [ ] All buttons have hover states with glow effects

---

## 🚀 PHASE 2: Outing Creation & People Management (UI Only)

**Owner**: Developer A

> 🎨 **UI ONLY** - Use `mockCreateOuting`, `mockPeople` from mock-data.ts. Store state locally with useState.

### Screens to Build:

#### 2.1 New Outing Page (`/outing/new`)

**User Story**: As a user, I can create a new outing and add friends.

**UI Requirements**:
- Step indicator at top (Step 1 of 2: Details → People)
- Outing name input
- Date picker (styled for dark mode)
- "Next" button

#### 2.2 Add People Page (`/outing/new/people`)

**User Story**: As a user, I can add people who were part of this outing.

**UI Requirements**:
- Header: "Who's in?" (HIMSSANS)
- Quick add: Name input + Add button
- List of added people with:
  - Avatar (initial-based, random accent color)
  - Name
  - Remove button (X)
- "Add from contacts" option (can be mocked)
- Minimum 2 people required validation
- "Continue to Receipts" button
- Subtle animations when adding/removing people

**Person Chip Design**:
```
┌────────────────────────────┐
│  🟣 AK   Alex Kim     ✕   │
└────────────────────────────┘
```

#### 2.3 Outing Overview Page (`/outing/[id]`)

**User Story**: As a user, I can see the overview of an outing and manage receipts.

**UI Requirements**:
- Header with outing name and date
- People section (horizontal scroll of avatars)
- "Add Receipt" button (camera icon + text)
- List of receipts (if any)
- Running total display
- "Calculate Split" button (appears after at least one receipt)

**Mock Navigation**:
```typescript
// Navigate to receipt upload on button click
const handleAddReceipt = () => {
  router.push(`/outing/${outingId}/receipt/upload`);
};
```

### ✅ Phase 2 Checkpoint

Both developers review:
- [ ] New outing creation flow is intuitive
- [ ] Adding people is smooth with animations
- [ ] Person chips look good with random colors
- [ ] Outing overview displays all sections
- [ ] Step indicators are clear
- [ ] Form validations show proper errors
- [ ] Back navigation works correctly

---

## 🚀 PHASE 3: Receipt Upload & Itemization (UI Only)

**Owner**: Developer B

> 🎨 **UI ONLY** - Use `mockProcessReceipt`, `mockOCRResponse` from mock-data.ts. No real OCR yet.

### Screens to Build:

#### 3.1 Receipt Upload Page (`/outing/[id]/receipt/upload`)

**User Story**: As a user, I can take photos or upload images of receipts.

**UI Requirements**:
- Large camera/upload area (dashed border with accent-purple)
- "Take Photo" button (primary)
- "Upload from Gallery" button (secondary)
- Batch upload support - show thumbnails of uploaded receipts
- Each thumbnail has remove (X) button
- "Process Receipts" button when at least one receipt uploaded
- Upload progress indicator

**Visual Design**:
```
┌─────────────────────────────────┐
│                                 │
│     📷                          │
│                                 │
│   Tap to capture receipt        │
│                                 │
│   ─────── or ───────           │
│                                 │
│   [ Upload from Gallery ]       │
│                                 │
└─────────────────────────────────┘

Uploaded (3):
┌─────┐ ┌─────┐ ┌─────┐
│ 📄 ✕│ │ 📄 ✕│ │ 📄 ✕│
└─────┘ └─────┘ └─────┘

[ Process 3 Receipts → ]
```

#### 3.2 Receipt Processing Screen (Loading State)

**UI Requirements**:
- Full screen overlay
- Animated processing indicator (pulse effect with accent colors)
- "Scanning receipt with AI..." text
- Receipt thumbnail being processed
- Progress bar or step indicator

> **Note for UI Phase**: Use `mockProcessReceipt()` from mock-data.ts to simulate the AI processing delay and return mock data. Real GPT-4o mini integration happens in Phase 7.

#### 3.3 Receipt Itemization Page (`/outing/[id]/receipt/[receiptId]`)

**User Story**: As a user, I can review and edit the itemized receipt.

**UI Requirements**:
- Receipt image thumbnail (tap to expand)
- Vendor name input (pre-filled from OCR)
- Itemized list:
  - Each item: Name, Quantity, Price
  - Editable fields
  - Delete item button
  - Add item button at bottom
- Subtotal, Tax, Tip inputs
- Total (calculated)
- "Next: Assign People" button

**Item Row Design**:
```
┌────────────────────────────────────────┐
│  Margherita Pizza         $18.00      │
│  Qty: 1                          [🗑]  │
├────────────────────────────────────────┤
│  Craft Beer (x2)          $16.00      │
│  Qty: 2                          [🗑]  │
├────────────────────────────────────────┤
│  [ + Add Item ]                        │
└────────────────────────────────────────┘

Subtotal:    $34.00
Tax:         $3.06
Tip:         $6.80
─────────────────────
Total:       $43.86
```

**Mock Data (simulates GPT-4o mini response)**:
```typescript
// This is what GPT-4o mini will return after processing
// Use this for UI development before wiring up the actual API
const mockReceiptData = {
  vendorName: "Luigi's Pizzeria",
  items: [
    { id: '1', name: 'Margherita Pizza', price: 18.00, quantity: 1 },
    { id: '2', name: 'Craft Beer', price: 8.00, quantity: 2 },
    { id: '3', name: 'Tiramisu', price: 9.00, quantity: 1 },
  ],
  subtotal: 43.00,
  tax: 3.87,
  tip: 8.60,
  total: 55.47
};
```

### ✅ Phase 3 Checkpoint

Both developers review:
- [ ] Camera/upload interface is intuitive
- [ ] Batch upload shows all receipts clearly
- [ ] Processing animation is smooth and on-brand
- [ ] Itemization page displays mock data correctly
- [ ] Items are editable (add, remove, modify)
- [ ] Totals calculate correctly on the frontend
- [ ] Receipt image can be viewed full-screen
- [ ] Consistent styling with previous phases

---

## 🚀 PHASE 4: People Assignment & Split Logic (UI Only)

**Owner**: Developer B

> 🎨 **UI ONLY** - Use `mockPeople`, `mockReceiptItems` from mock-data.ts. Calculate splits with simple JS math in component state.

### Screens to Build:

#### 4.1 Who Was There? (`/outing/[id]/receipt/[receiptId]/attendees`)

**User Story**: As a user, I can select which people from the outing were present for this receipt.

**UI Requirements**:
- Header: "Who was there?" (HIMSSANS)
- List of all outing people with checkboxes
- All selected by default
- Visual distinction for selected vs unselected
- At least one person required
- "Next" button

**Selection Design**:
```
Who was there?

[✓] 🟣 Alex Kim
[✓] 🟠 Jordan Lee  
[ ] 🟣 Sam Chen        ← Dimmed when not selected
[✓] 🟠 Morgan Park

[ Continue → ]
```

#### 4.2 Who Paid? (`/outing/[id]/receipt/[receiptId]/payer`)

**User Story**: As a user, I can select who paid for this receipt.

**UI Requirements**:
- Header: "Who paid?"
- Single-select list of attendees (only those who were there)
- Radio button or card selection style
- Selected card has accent-orange border/glow
- "Next" button

#### 4.3 Split Method Selection (`/outing/[id]/receipt/[receiptId]/split-method`)

**User Story**: As a user, I can choose how to split this receipt.

**UI Requirements**:
- Header: "How do you want to split?"
- Two large cards:
  1. **Split Equally**
     - Icon: ⚖️ or similar
     - Description: "Divide total evenly among selected people"
     - Shows preview: "$XX.XX per person"
  2. **Split by Items**
     - Icon: 📋 or similar
     - Description: "Assign specific items to specific people"
     - Shows: "Tax & tip split proportionally"
- Cards have accent gradient on selection

#### 4.4a Equal Split Configuration (`/outing/[id]/receipt/[receiptId]/split-equal`)

**User Story**: As a user, I can include/exclude people from an equal split.

**UI Requirements**:
- Shows calculation preview
- Checkboxes to include/exclude people
- Live update of per-person amount
- Tax & tip distribution shown
- "Confirm Split" button

**Calculation Display**:
```
Splitting $55.47 equally

Include:
[✓] Alex Kim      →  $18.49
[✓] Jordan Lee    →  $18.49
[✓] Morgan Park   →  $18.49
[ ] Sam Chen      →  $0.00

────────────────────────
Total: $55.47 ✓

[ Confirm Split ]
```

#### 4.4b Item Assignment (`/outing/[id]/receipt/[receiptId]/split-items`)

**User Story**: As a user, I can assign items to specific people.

**UI Requirements**:
- List of items from receipt
- Each item expandable/tappable
- Multi-select people for each item (item can be shared)
- Visual indicator of assignment status
- Unassigned items highlighted in warning color
- Tax/tip allocation explanation
- Running tally per person
- All items must be assigned before proceeding

**Item Assignment Design**:
```
Assign items to people:

┌────────────────────────────────────────┐
│ Margherita Pizza - $18.00              │
│ ┌─────┐ ┌─────┐ ┌─────┐               │
│ │ AK ✓│ │ JL  │ │ MP ✓│               │
│ └─────┘ └─────┘ └─────┘               │
│ Split: $9.00 each                      │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Craft Beer (x2) - $16.00      ⚠️      │
│ Not yet assigned                       │
│ [ Tap to assign ]                      │
└────────────────────────────────────────┘

────────────────────────────────
Per Person Totals (before tax/tip):
Alex Kim:      $15.00
Jordan Lee:    $0.00  ← Warning if $0
Morgan Park:   $21.00

[ 1 item unassigned - Assign to continue ]
```

### ✅ Phase 4 Checkpoint

Both developers review:
- [ ] Attendee selection works correctly
- [ ] Payer selection is clear
- [ ] Split method cards are visually distinct
- [ ] Equal split calculates correctly
- [ ] Item assignment UI is intuitive
- [ ] Multi-person item sharing works
- [ ] Unassigned items are clearly indicated
- [ ] Running totals update in real-time
- [ ] Tax/tip distribution is clear

---

## 🚀 PHASE 5: Calculation & Results (UI Only)

**Owner**: Developer B (Results Display) + Developer A (Share/Credit System)

> 🎨 **UI ONLY** - Use `mockOwingSummary`, `mockSettlements` from mock-data.ts. Share uses Web Share API or copies text.

### Screens to Build:

#### 5.1 Processing Calculations (Loading State)

**UI Requirements**:
- Brief animation while calculating
- "Crunching the numbers..." text
- Progress through receipts visually

#### 5.2 Results Overview (`/outing/[id]/results`)

**User Story**: As a user, I can see the final breakdown of who owes whom.

**UI Requirements**:
- Header: "The Breakdown" (HIMSSANS with accent gradient)
- Summary cards for each person:
  - Name and avatar
  - Their total spent
  - What they owe / are owed
  - Net position (owing or receiving)
- Settlements section:
  - Clear "X owes Y: $XX.XX" statements
  - Simplified (minimized transactions)
- "Share" button
- "Mark as Settled" button

**Results Display**:
```
🌙 The Breakdown

Friday Night Dinner
January 15, 2024

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Alex Kim
   Paid:     $55.47
   Share:    $18.49
   ──────────────────
   Is owed:  $36.98  ✨

👤 Jordan Lee  
   Paid:     $0.00
   Share:    $18.49
   ──────────────────
   Owes:     $18.49  

👤 Morgan Park
   Paid:     $0.00
   Share:    $18.49
   ──────────────────
   Owes:     $18.49

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💸 Settlements:

┌────────────────────────────────┐
│ Jordan → Alex:      $18.49    │
│ [ Mark Paid ]                  │
├────────────────────────────────┤
│ Morgan → Alex:      $18.49    │
│ [ Mark Paid ]                  │
└────────────────────────────────┘

[ Share Results ]  [ Close Outing ]
```

#### 5.3 Individual Breakdown (Modal/Expandable)

**User Story**: As a user, I can see detailed breakdown for each person.

**UI Requirements**:
- Expandable section or modal
- Per-receipt breakdown
- Items assigned to them
- Tax/tip portion
- Clear math showing how total was calculated

#### 5.4 Share Results Modal

**User Story**: As a user, I can share the breakdown with my group.

**UI Requirements**:
- Shareable summary (text format)
- Copy to clipboard button
- Share via apps (native share sheet)
- Optional: Generate shareable link

**Share Format**:
```
🌙 Outlate - Friday Night Dinner

Alex paid $55.47 and is owed $36.98

Settlements needed:
• Jordan → Alex: $18.49
• Morgan → Alex: $18.49

Generated by Outlate ✨
```

#### 5.5 Credit System (`/outing/[id]/settlements`)

**User Story**: As a user, I can track which debts have been paid back.

**UI Requirements**:
- List of all settlements
- Toggle/button to mark as paid
- Date paid recorded
- History of settlements
- Filter: Pending / Completed
- Optional: Venmo/PayPal integration buttons

### ✅ Phase 5 Checkpoint

Both developers review:
- [ ] Calculations are mathematically correct
- [ ] Results display is clear and readable
- [ ] Per-person breakdown is accurate
- [ ] Settlements minimize transactions
- [ ] Share functionality works
- [ ] Credit system tracks payments
- [ ] Mark as paid updates state
- [ ] Visual hierarchy emphasizes important info

---

## 🚀 PHASE 6: UI Polish & Flow Connection (UI Only)

**Owner**: Both Developers

> 🎨 **STILL UI ONLY** - This phase connects all screens and polishes the UI. Still using mock data.

### Tasks:

#### 6.1 Connect All UI Flows
- [ ] Auth → Dashboard navigation works smoothly
- [ ] Dashboard → New Outing flow is seamless
- [ ] Outing → Receipt flow transitions nicely
- [ ] Receipt → Results flow feels complete
- [ ] Results → Back to Dashboard works
- [ ] All "back" buttons work correctly

#### 6.2 Global State with Mocks
- [ ] Set up Zustand store with mock data
- [ ] Outing state persists across screens (in memory)
- [ ] People added in step 2 show in step 3
- [ ] Receipt data flows to results
- [ ] Use localStorage for simple persistence during dev

#### 6.3 Polish & UX
- [ ] Loading states on all async actions (use mockDelay)
- [ ] Error states (even if they're fake errors)
- [ ] Empty states are beautiful
- [ ] Animations and transitions are smooth
- [ ] Hover/active states on all interactive elements
- [ ] Keyboard handling (Enter to submit, Escape to close)
- [ ] Accessibility basics (focus states, aria labels)

#### 6.4 Visual QA
- [ ] All fonts rendering correctly
- [ ] Colors consistent across all screens
- [ ] Spacing consistent
- [ ] Dark mode looks great everywhere
- [ ] Mobile layout works
- [ ] Desktop layout works

### ✅ Phase 6 Checkpoint (Pre-Backend)

Both developers sign off that UI is COMPLETE:
- [ ] Every screen is built and beautiful
- [ ] All flows work with mock data
- [ ] App feels polished and fun
- [ ] No broken links or dead ends
- [ ] Responsive on all devices
- [ ] Ready for backend integration

---

## 🚀 PHASE 7: Backend Integration (Firebase + GPT-4o mini)

**Owner**: Developer A (Firebase Setup) + Developer B (GPT-4o mini + Wiring)

> ⚡ **NOW WE ADD REAL FUNCTIONALITY** - Replace all mocks with real Firebase and AI calls.

### 7.1 Firebase Setup (Developer A)

#### Step 1: Install Firebase Dependencies

```bash
npm install firebase openai
```

#### Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Name it `outlate` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click **"Create Project"**

#### Step 3: Enable Authentication

1. In Firebase Console sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **Email/Password**: Click, toggle "Enable", Save
5. Enable **Google** (optional): Click, toggle "Enable", add support email, Save

#### Step 4: Create Firestore Database

1. In sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"**
4. Select location closest to users (e.g., `us-east1`)
5. Click **"Enable"**

#### Step 5: Set Up Firebase Storage

1. In sidebar, click **"Storage"**
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **"Next"**, select same location as Firestore
5. Click **"Done"**

#### Step 6: Get Firebase Config

1. Click **gear icon** ⚙️ → **"Project settings"**
2. Scroll to **"Your apps"**
3. Click **Web icon** `</>`
4. Register app: `outlate-web`
5. Copy the `firebaseConfig` object

#### Step 7: Create Environment Variables

Create `.env.local` in project root:

```bash
# .env.local

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=outlate-xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=outlate-xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=outlate-xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# OpenAI (for GPT-4o mini)
OPENAI_API_KEY=sk-...
```

> ⚠️ Add `.env.local` to `.gitignore`!

#### Step 8: Create Firebase Config Files

**`src/lib/firebase/config.ts`**
```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
```

**`src/lib/firebase/auth.ts`**
```typescript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export const signUp = async (email: string, password: string, name: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName: name });
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    name: name,
    createdAt: new Date().toISOString(),
  });
  return user;
};

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      avatarUrl: user.photoURL,
      createdAt: new Date().toISOString(),
    });
  }
  return user;
};

export const signOut = () => firebaseSignOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
```

**`src/lib/firebase/firestore.ts`**
```typescript
import {
  collection, doc, addDoc, getDoc, getDocs,
  updateDoc, deleteDoc, query, where, orderBy, Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Outing, Receipt, Settlement } from '../types';

// OUTINGS
export const createOuting = async (outing: Omit<Outing, 'id'>) => {
  const docRef = await addDoc(collection(db, 'outings'), {
    ...outing,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getOuting = async (outingId: string) => {
  const docSnap = await getDoc(doc(db, 'outings', outingId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Outing : null;
};

export const getUserOutings = async (userId: string) => {
  const q = query(
    collection(db, 'outings'),
    where('createdBy', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Outing));
};

export const updateOuting = async (outingId: string, data: Partial<Outing>) => {
  await updateDoc(doc(db, 'outings', outingId), { ...data, updatedAt: Timestamp.now() });
};

export const deleteOuting = async (outingId: string) => {
  await deleteDoc(doc(db, 'outings', outingId));
};

// RECEIPTS (subcollection)
export const addReceipt = async (outingId: string, receipt: Omit<Receipt, 'id'>) => {
  const docRef = await addDoc(collection(db, 'outings', outingId, 'receipts'), {
    ...receipt,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getReceipts = async (outingId: string) => {
  const snap = await getDocs(collection(db, 'outings', outingId, 'receipts'));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Receipt));
};

export const updateReceipt = async (outingId: string, receiptId: string, data: Partial<Receipt>) => {
  await updateDoc(doc(db, 'outings', outingId, 'receipts', receiptId), data);
};

// SETTLEMENTS (subcollection)
export const addSettlement = async (outingId: string, settlement: Omit<Settlement, 'id'>) => {
  const docRef = await addDoc(collection(db, 'outings', outingId, 'settlements'), settlement);
  return docRef.id;
};

export const getSettlements = async (outingId: string) => {
  const snap = await getDocs(collection(db, 'outings', outingId, 'settlements'));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Settlement));
};

export const markSettlementPaid = async (outingId: string, settlementId: string) => {
  await updateDoc(doc(db, 'outings', outingId, 'settlements', settlementId), {
    paid: true,
    paidAt: Timestamp.now(),
  });
};
```

**`src/lib/firebase/storage.ts`**
```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './config';

export const uploadReceiptImage = async (outingId: string, file: File): Promise<string> => {
  const filename = `${Date.now()}_${file.name}`;
  const storageRef = ref(storage, `receipts/${outingId}/${filename}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export const uploadMultipleReceipts = async (outingId: string, files: File[]): Promise<string[]> => {
  return Promise.all(files.map(file => uploadReceiptImage(outingId, file)));
};
```

---

### 7.2 GPT-4o mini Receipt Processing (Developer B)

#### Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to **API Keys**
3. Create new key: `outlate-receipt-processing`
4. Copy key to `.env.local` as `OPENAI_API_KEY`

> **Cost**: GPT-4o mini costs ~$0.01 per receipt. Set usage limits in OpenAI dashboard.

#### Create API Route

**`src/app/api/process-receipt/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Parse this receipt image and return JSON:
{
  "vendorName": "string",
  "items": [{ "name": "string", "price": number, "quantity": number }],
  "subtotal": number,
  "tax": number,
  "tip": number,
  "total": number
}
Be precise. Return valid JSON only.`,
        },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: imageUrl } },
            { type: 'text', text: 'Parse this receipt as JSON.' },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '';
    let jsonString = content;
    const match = content.match(/```json\n?([\s\S]*?)\n?```/);
    if (match) jsonString = match[1];

    return NextResponse.json(JSON.parse(jsonString));
  } catch (error) {
    console.error('Receipt processing error:', error);
    return NextResponse.json({ error: 'Failed to process receipt' }, { status: 500 });
  }
}
```

#### Create Receipt Processor Hook

**`src/hooks/useReceiptProcessor.ts`**
```typescript
import { useState } from 'react';
import { uploadReceiptImage } from '@/lib/firebase/storage';

interface ProcessedReceipt {
  vendorName: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  imageUrl: string;
}

export function useReceiptProcessor() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processReceipt = async (outingId: string, file: File): Promise<ProcessedReceipt | null> => {
    setProcessing(true);
    setError(null);

    try {
      const imageUrl = await uploadReceiptImage(outingId, file);
      
      const response = await fetch('/api/process-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) throw new Error('Failed to process');

      const data = await response.json();
      
      return {
        ...data,
        imageUrl,
        items: data.items.map((item: any, i: number) => ({
          ...item,
          id: `item-${Date.now()}-${i}`,
        })),
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setProcessing(false);
    }
  };

  return { processReceipt, processing, error };
}
```

---

### 7.3 Replace Mocks with Real Calls

#### Replace MockAuthProvider with Real AuthProvider

**`src/context/AuthContext.tsx`**
```typescript
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthChange, signIn, signUp, signOut, signInWithGoogle } from '@/lib/firebase/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string, name: string) => Promise<User>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

#### Update Components to Use Real Data

Replace all imports from `mock-data.ts` with real Firebase calls:

```typescript
// BEFORE (UI Phase)
import { mockGetOutings } from '@/lib/mock-data';
const outings = await mockGetOutings();

// AFTER (Phase 7)
import { getUserOutings } from '@/lib/firebase/firestore';
const outings = await getUserOutings(user.uid);
```

---

### 7.4 Security Rules

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /outings/{outingId} {
      allow read, write: if request.auth != null && resource.data.createdBy == request.auth.uid;
      allow create: if request.auth != null;
      match /receipts/{receiptId} {
        allow read, write: if request.auth != null;
      }
      match /settlements/{settlementId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /receipts/{outingId}/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

### ✅ Phase 7 Checkpoint (Final)

Both developers sign off:
- [ ] Firebase Auth working (sign up, sign in, Google)
- [ ] Firestore CRUD working
- [ ] Storage uploads working
- [ ] GPT-4o mini processing receipts
- [ ] All mocks replaced with real calls
- [ ] Data persists across sessions
- [ ] Security rules deployed
- [ ] Complete user flow works end-to-end
- [ ] No console errors
- [ ] Ready for production! 🎉

---

## 📁 Shared Component Library Reference

Both developers should use these shared components:

```typescript
// Components both devs should build and share:

<Button variant="primary" | "secondary" | "ghost" />
<Card variant="default" | "elevated" | "gradient-border" />
<Input label="" placeholder="" error="" />
<Avatar name="" color="" size="sm" | "md" | "lg" />
<Badge variant="success" | "warning" | "info" />
<Modal isOpen onClose title="" />
<Checkbox checked onChange label="" />
<RadioGroup options value onChange />
<PersonChip person onRemove />
<ReceiptCard receipt onClick />
<SettlementRow settlement onMarkPaid />
<LoadingSpinner />
<EmptyState icon title description action />
<StepIndicator currentStep totalSteps labels />
```

---

## 🔗 API Routes & Firebase Collections (Phase 7 Reference)

> **Note**: This section is for Phase 7 reference only. During UI phases (1-6), no API routes or Firebase are needed.

### API Routes (Next.js)

```
/api/
└── process-receipt/
    └── route.ts           # GPT-4o mini OCR processing
```

> Most data operations use Firebase SDK directly from the client/server components via the functions in `src/lib/firebase/`. The only API route needed is for GPT-4o mini processing since the OpenAI API key must stay server-side.

### Firebase Collections Structure

```
Firestore Database:
├── users/
│   └── {userId}/
│       ├── uid: string
│       ├── email: string
│       ├── name: string
│       ├── avatarUrl?: string
│       └── createdAt: timestamp
│
└── outings/
    └── {outingId}/
        ├── name: string
        ├── date: timestamp
        ├── createdBy: string (userId)
        ├── people: Person[]
        ├── status: 'active' | 'settled' | 'archived'
        ├── createdAt: timestamp
        ├── updatedAt: timestamp
        │
        ├── receipts/ (subcollection)
        │   └── {receiptId}/
        │       ├── imageUrl: string
        │       ├── vendorName: string
        │       ├── items: ReceiptItem[]
        │       ├── subtotal: number
        │       ├── tax: number
        │       ├── tip: number
        │       ├── total: number
        │       ├── paidBy: string (personId)
        │       ├── splitMethod: 'equal' | 'by-item'
        │       ├── includedPeople: string[]
        │       └── createdAt: timestamp
        │
        └── settlements/ (subcollection)
            └── {settlementId}/
                ├── fromPerson: string (personId)
                ├── toPerson: string (personId)
                ├── amount: number
                ├── paid: boolean
                └── paidAt?: timestamp

Firebase Storage:
└── receipts/
    └── {outingId}/
        └── {timestamp}_{filename}.jpg
```

### Data Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Auth Actions ──────────► Firebase Auth                     │
│                                                             │
│  CRUD Operations ───────► Firestore (via SDK)               │
│                                                             │
│  Image Upload ──────────► Firebase Storage                  │
│       │                                                     │
│       ▼                                                     │
│  Get Download URL                                           │
│       │                                                     │
│       ▼                                                     │
│  /api/process-receipt ──► GPT-4o mini ──► Parsed Data       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Success Criteria

The app is complete when:

1. ✅ Users can create accounts and sign in
2. ✅ Users can create outings and add people
3. ✅ Users can upload and process receipts
4. ✅ System correctly itemizes receipts
5. ✅ Users can assign items or split equally
6. ✅ Calculations correctly determine who owes whom
7. ✅ Results can be shared
8. ✅ Credit system tracks repayments
9. ✅ UI is consistent with design system (dark mode, accent colors, fonts)
10. ✅ App feels fun and matches the "late-night out" vibe

---

## 📝 Notes for Cursor

When building each phase:

1. **UI FIRST (Phases 1-6)**: Build ALL screens with mock data before touching any backend
2. **Use mock-data.ts**: Import mock functions for all data operations during UI phases
3. **Use TypeScript strictly**: Define types before implementing
4. **Follow the design system**: Reference colors, fonts, and component styles above
5. **Check mobile first**: Design for mobile, then adapt for desktop
6. **Checkpoint after each phase**: Both developers must run the app and approve before moving on
7. **Backend LAST (Phase 7)**: Only set up Firebase and GPT-4o mini after ALL UI is complete

### Phase Summary:
- **Phase 0**: Project setup, design system, types, mock data
- **Phase 1-5**: Build individual screen groups (UI only, mocked)
- **Phase 6**: Polish and connect all UI flows (still mocked)
- **Phase 7**: Firebase + GPT-4o mini integration (replace mocks)

Good luck, and have fun building Outlate! 🌙✨

