// src/lib/constants.ts
// App constants for Outlate

export const APP_NAME = 'Outlate';
export const APP_TAGLINE = 'Split the night, not friendships';
export const APP_DESCRIPTION = 'Receipt splitting app for friend groups who go out together';

// Route paths
export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/dashboard',
  NEW_OUTING: '/outing/new',
  OUTING: (id: string) => `/outing/${id}`,
  RECEIPT_UPLOAD: (outingId: string) => `/outing/${outingId}/receipt/upload`,
  RECEIPT: (outingId: string, receiptId: string) => `/outing/${outingId}/receipt/${receiptId}`,
  RECEIPT_ATTENDEES: (outingId: string, receiptId: string) => 
    `/outing/${outingId}/receipt/${receiptId}/attendees`,
  RECEIPT_PAYER: (outingId: string, receiptId: string) => 
    `/outing/${outingId}/receipt/${receiptId}/payer`,
  RECEIPT_SPLIT_METHOD: (outingId: string, receiptId: string) => 
    `/outing/${outingId}/receipt/${receiptId}/split-method`,
  RECEIPT_SPLIT_EQUAL: (outingId: string, receiptId: string) => 
    `/outing/${outingId}/receipt/${receiptId}/split-equal`,
  RECEIPT_SPLIT_ITEMS: (outingId: string, receiptId: string) => 
    `/outing/${outingId}/receipt/${receiptId}/split-items`,
  OUTING_RESULTS: (outingId: string) => `/outing/${outingId}/results`,
  OUTING_SETTLEMENTS: (outingId: string) => `/outing/${outingId}/settlements`,
} as const;

// Design tokens
export const COLORS = {
  background: {
    primary: '#0D0D0D',
    secondary: '#1A1A1A',
    tertiary: '#252525',
  },
  accent: {
    purple: '#4F1787',
    purpleHover: '#6B1FB0',
    purpleMuted: 'rgba(79, 23, 135, 0.3)',
    orange: '#FB773C',
    orangeHover: '#FF8F5A',
    orangeMuted: 'rgba(251, 119, 60, 0.3)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0A0',
    muted: '#666666',
  },
  utility: {
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
  },
  border: {
    subtle: '#2A2A2A',
    default: '#3A3A3A',
  },
} as const;

// Person avatar colors
export const AVATAR_COLORS = [
  '#4F1787', // Purple
  '#FB773C', // Orange
  '#22C55E', // Green
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#8B5CF6', // Violet
  '#F59E0B', // Amber
  '#06B6D4', // Cyan
] as const;

// Animation durations
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Validation
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MIN_OUTING_NAME_LENGTH: 1,
  MAX_OUTING_NAME_LENGTH: 100,
  MIN_PEOPLE_FOR_OUTING: 2,
  MAX_PEOPLE_FOR_OUTING: 50,
  MAX_RECEIPTS_PER_OUTING: 20,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  CURRENT_OUTING: 'outlate_current_outing',
  DRAFT_OUTING: 'outlate_draft_outing',
  USER_PREFERENCES: 'outlate_user_preferences',
} as const;

// API endpoints (for Phase 7)
export const API_ENDPOINTS = {
  PROCESS_RECEIPT: '/api/process-receipt',
} as const;

