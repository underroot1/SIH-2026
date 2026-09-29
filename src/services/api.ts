import {
  type Reminder,
  type Memory,
  type Person,
  type Game,
  mockReminders,
  mockMemories,
  mockPeople,
  mockGames,
} from '@/data/mockData';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

/**
 * Base API response type — every hook in src/hooks depends on this shape.
 */
export interface ApiResponse<T> {
  data: T;
  error: string | null;
}

function fail<T>(fallback: T, message: string): ApiResponse<T> {
  return { data: fallback, error: message };
}

async function currentUserId(): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  const isDemo = localStorage.getItem('haven_demo_user');
  if (isDemo) return null; // Use local in-memory interactive data for demo user
  try {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
  } catch {
    return null;
  }
}

// In-memory demo state for when browsing in Guest / Demo mode
let demoReminders: Reminder[] = [...mockReminders];
let demoMemories: Memory[] = [...mockMemories];
let demoPeople: Person[] = [...mockPeople];

/**
 * ─── REMINDER SERVICE ───────────────────────────────────────────────
 */

export const reminderService = {
  async getAll(): Promise<ApiResponse<Reminder[]>> {
    const userId = await currentUserId();
    if (!userId) {
      // In demo/guest mode, return mock reminders
      return { data: [...demoReminders], error: null };
    }

    const { data, error } = await supabase
      .from('reminders')
      .select('id, type, title, time, description, done, icon')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) return fail([], error.message);
    return { data: (data ?? []) as Reminder[], error: null };
  },

  async complete(id: string): Promise<ApiResponse<{ id: string; done: boolean }>> {
    const userId = await currentUserId();
    if (!userId) {
      demoReminders = demoReminders.map((r) => (r.id === id ? { ...r, done: true } : r));
      return { data: { id, done: true }, error: null };
    }

    const { error } = await supabase.from('reminders').update({ done: true }).eq('id', id);
    if (error) return fail({ id, done: false }, error.message);
    return { data: { id, done: true }, error: null };
  },

  async create(reminder: Omit<Reminder, 'id' | 'done'>): Promise<ApiResponse<Reminder>> {
    const userId = await currentUserId();
    const newId = 'rem_' + Math.random().toString(36).slice(2, 9);
    const newReminder: Reminder = { ...reminder, id: newId, done: false };

    if (!userId) {
      demoReminders = [...demoReminders, newReminder];
      return { data: newReminder, error: null };
    }

    const { data, error } = await supabase
      .from('reminders')
      .insert({ ...reminder, user_id: userId })
      .select('id, type, title, time, description, done, icon')
      .single();

    if (error || !data) return fail(newReminder, error?.message ?? 'Could not create reminder.');
    return { data: data as Reminder, error: null };
  },
};

/**
 * ─── MEMORY SERVICE ─────────────────────────────────────────────────
 */

export const memoryService = {
  async getAll(): Promise<ApiResponse<Memory[]>> {
    const userId = await currentUserId();
    if (!userId) {
      return { data: [...demoMemories], error: null };
    }

    const { data, error } = await supabase
      .from('memories')
      .select('id, title, description, year, image, caption, detail')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) return fail([], error.message);
    return { data: (data ?? []) as Memory[], error: null };
  },

  async create(memory: Omit<Memory, 'id'>): Promise<ApiResponse<Memory>> {
    const userId = await currentUserId();
    const newId = 'mem_' + Math.random().toString(36).slice(2, 9);
    const newMemory: Memory = { ...memory, id: newId };

    if (!userId) {
      demoMemories = [...demoMemories, newMemory];
      return { data: newMemory, error: null };
    }

    const { data, error } = await supabase
      .from('memories')
      .insert({ ...memory, user_id: userId })
      .select('id, title, description, year, image, caption, detail')
      .single();

    if (error || !data) return fail(newMemory, error?.message ?? 'Could not save memory.');
    return { data: data as Memory, error: null };
  },
};

/**
 * ─── PEOPLE SERVICE ─────────────────────────────────────────────────
 */

export const peopleService = {
  async getAll(): Promise<ApiResponse<Person[]>> {
    const userId = await currentUserId();
    if (!userId) {
      return { data: [...demoPeople], error: null };
    }

    const { data, error } = await supabase
      .from('people')
      .select('id, name, relationship, image, info, phone')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) return fail([], error.message);
    return { data: (data ?? []) as Person[], error: null };
  },

  async create(person: Omit<Person, 'id'>): Promise<ApiResponse<Person>> {
    const userId = await currentUserId();
    const newId = 'per_' + Math.random().toString(36).slice(2, 9);
    const newPerson: Person = { ...person, id: newId };

    if (!userId) {
      demoPeople = [...demoPeople, newPerson];
      return { data: newPerson, error: null };
    }

    const { data, error } = await supabase
      .from('people')
      .insert({ ...person, user_id: userId })
      .select('id, name, relationship, image, info, phone')
      .single();

    if (error || !data) return fail(newPerson, error?.message ?? 'Could not save person.');
    return { data: data as Person, error: null };
  },
};

/**
 * ─── GAME SERVICE ───────────────────────────────────────────────────
 * Shared app content — readable by signed-in users or fallbacks to mockGames.
 */

export const gameService = {
  async getAll(): Promise<ApiResponse<Game[]>> {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('id, title, description, icon, gradient')
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        return { data: mockGames, error: null };
      }
      return { data: data as Game[], error: null };
    } catch {
      return { data: mockGames, error: null };
    }
  },
};

