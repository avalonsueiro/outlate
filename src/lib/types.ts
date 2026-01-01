// src/lib/types.ts
// Core TypeScript types for Outlate

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

// Form types
export interface OutingFormData {
  name: string;
  date: Date;
}

export interface PersonFormData {
  name: string;
}

// OCR Response from GPT-4o mini
export interface OCRResponse {
  vendorName: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
}

// Component prop types
export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export interface CardVariant {
  variant?: 'default' | 'elevated' | 'gradient-border';
}

export interface AvatarSize {
  size?: 'sm' | 'md' | 'lg';
}

