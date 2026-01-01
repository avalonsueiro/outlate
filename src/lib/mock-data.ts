// src/lib/mock-data.ts
// This file contains ALL mock data for UI development
// DO NOT connect to real APIs until Phase 7

import { User, Outing, Person, Receipt, ReceiptItem, Settlement, OwingSummary, OCRResponse } from './types';

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
export const mockOCRResponse: OCRResponse = {
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
export const mockDelay = (ms: number = 800): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock sign in (always succeeds)
export const mockSignIn = async (email: string, _password: string): Promise<User> => {
  await mockDelay(1000);
  return { ...mockCurrentUser, email };
};

// Mock sign up (always succeeds)
export const mockSignUp = async (email: string, _password: string, name: string): Promise<User> => {
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

// Mock add person to outing
export const mockAddPerson = async (outingId: string, name: string): Promise<Person> => {
  await mockDelay(300);
  const colors = ['#4F1787', '#FB773C', '#22C55E', '#3B82F6', '#EC4899', '#8B5CF6'];
  return {
    id: `person-${Date.now()}`,
    name,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
};

// Mock process receipt (simulates GPT-4o mini OCR)
export const mockProcessReceipt = async (_file: File): Promise<OCRResponse> => {
  await mockDelay(2000); // Simulate AI processing time
  return mockOCRResponse;
};

// Mock image upload (returns fake URL)
export const mockUploadImage = async (_file: File): Promise<string> => {
  await mockDelay(1000);
  return `/mock/uploaded-${Date.now()}.jpg`;
};

// Mock update settlement
export const mockMarkSettlementPaid = async (settlementId: string): Promise<Settlement> => {
  await mockDelay(500);
  const settlement = mockSettlements.find(s => s.id === settlementId);
  if (!settlement) {
    throw new Error('Settlement not found');
  }
  return {
    ...settlement,
    paid: true,
    paidAt: new Date(),
  };
};

