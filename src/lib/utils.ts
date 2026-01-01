// src/lib/utils.ts
// Utility functions for Outlate

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency (USD)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Format a date in a readable format
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Format a date as a short string (e.g., "Jan 15")
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Get initials from a name (e.g., "Alex Kim" -> "AK")
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a random color from the accent palette
 */
export function getRandomAccentColor(): string {
  const colors = [
    '#4F1787', // Purple
    '#FB773C', // Orange
    '#22C55E', // Green
    '#3B82F6', // Blue
    '#EC4899', // Pink
    '#8B5CF6', // Violet
    '#F59E0B', // Amber
    '#06B6D4', // Cyan
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate the per-person split amount
 */
export function calculateEqualSplit(total: number, numberOfPeople: number): number {
  if (numberOfPeople === 0) return 0;
  return Math.round((total / numberOfPeople) * 100) / 100;
}

/**
 * Calculate tax and tip proportionally based on subtotal share
 */
export function calculateProportionalShare(
  itemTotal: number,
  subtotal: number,
  tax: number,
  tip: number
): number {
  if (subtotal === 0) return 0;
  const proportion = itemTotal / subtotal;
  const taxShare = tax * proportion;
  const tipShare = tip * proportion;
  return Math.round((itemTotal + taxShare + tipShare) * 100) / 100;
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if we're running on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safely parse JSON with a fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

