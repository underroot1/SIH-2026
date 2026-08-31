import type { Reminder, Memory, Person, Game } from '@/data/mockData';
import { mockReminders, mockMemories, mockPeople, mockGames } from '@/data/mockData';

/**
 * Base API response type — the backend team should return this shape
 * from their real endpoints so the frontend hooks work unchanged.
 */
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

/**
 * Simulated network delay so loading states are visible during demos.
 * Remove or set to 0 once the real backend is connected.
 */
const MOCK_DELAY_MS = 600;

function mockDelay<T>(data: T): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data, error: null }), MOCK_DELAY_MS);
  });
}

/**
 * ─── REMINDER SERVICE ───────────────────────────────────────────────
 * Replace the bodies below with real fetch() calls to your backend.
 * The function signatures are what the frontend hooks depend on.
 */

export const reminderService = {
  async getAll(): Promise<ApiResponse<Reminder[]>> {
    return mockDelay(mockReminders);
  },

  async complete(id: string): Promise<ApiResponse<{ id: string; done: boolean }>> {
    return mockDelay({ id, done: true });
  },

  async create(reminder: Omit<Reminder, 'id' | 'done'>): Promise<ApiResponse<Reminder>> {
    const created: Reminder = { ...reminder, id: `r${Date.now()}`, done: false };
    return mockDelay(created);
  },
};

/**
 * ─── MEMORY SERVICE ─────────────────────────────────────────────────
 */

export const memoryService = {
  async getAll(): Promise<ApiResponse<Memory[]>> {
    return mockDelay(mockMemories);
  },

  async create(memory: Omit<Memory, 'id'>): Promise<ApiResponse<Memory>> {
    const created: Memory = { ...memory, id: `m${Date.now()}` };
    return mockDelay(created);
  },
};

/**
 * ─── PEOPLE SERVICE ─────────────────────────────────────────────────
 */

export const peopleService = {
  async getAll(): Promise<ApiResponse<Person[]>> {
    return mockDelay(mockPeople);
  },

  async create(person: Omit<Person, 'id'>): Promise<ApiResponse<Person>> {
    const created: Person = { ...person, id: `p${Date.now()}` };
    return mockDelay(created);
  },
};

/**
 * ─── GAME SERVICE ───────────────────────────────────────────────────
 */

export const gameService = {
  async getAll(): Promise<ApiResponse<Game[]>> {
    return mockDelay(mockGames);
  },
};
