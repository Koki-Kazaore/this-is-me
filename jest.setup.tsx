import '@testing-library/jest-dom';
import React from 'react';
import { randomUUID } from 'crypto';

// Mock replacing next/image with a simple <img> tag
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      // The src in the props is passed directly to the <img> tag
      return <img {...props} />;
    },
  };
});

// Implement an IntersectionObserver mock
class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    // No callbacks need to be invoked here
  }

  observe(target: Element): void {
    // It's a mock, so it doesn't do anything
  }

  unobserve(target: Element): void {
    // It's a mock, so it doesn't do anything
  }

  disconnect(): void {
    // It's a mock, so it doesn't do anything
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

// Set IntersectionObserver to window or global
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  window.IntersectionObserver = IntersectionObserverMock;
} else if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = IntersectionObserverMock as any;
}

// jsdom does not implement crypto.randomUUID; fall back to Node's implementation
if (typeof globalThis.crypto?.randomUUID !== 'function') {
  if (globalThis.crypto) {
    Object.defineProperty(globalThis.crypto, 'randomUUID', { value: randomUUID, configurable: true });
  } else {
    Object.defineProperty(globalThis, 'crypto', { value: { randomUUID }, configurable: true });
  }
}
