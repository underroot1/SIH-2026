import type { Reminder, Memory, Person, Game } from '@/data/mockData';
import { supabase } from '@/lib/supabaseClient';

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
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

/**
 * ─── REMINDER SERVICE ───────────────────────────────────────────────
 */

export const reminderService = {
  async getAll(): Promise<ApiResponse<Reminder[]>> {
    const userId = await currentUserId();
    if (!userId) return fail([], 'Please log in to see your reminders.');

    const { data, error } = await supabase
      .from('reminders')
      .select('id, type, title, time, description, done, icon')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) return fail([], error.message);
    return { data: (data ?? []) as Reminder[], error: null };
  },

  async complete(id: string): Promise<ApiResponse<{ id: string; done: boolean }>> {
    const { error } = await supabase.from('reminders').update({ done: true }).eq('id', id);
    if (error) return fail({ id, done: false }, error.message);
    return { data: { id, done: true }, error: null };
  },

  async create(reminder: Omit<Reminder, 'id' | 'done'>): Promise<ApiResponse<Reminder>> {
    const userId = await currentUserId();
    const placeholder: Reminder = { ...reminder, id: '', done: false };
    if (!userId) return fail(placeholder, 'Please log in to add a reminder.');

    const { data, error } = await supabase
      .from('reminders')
      .insert({ ...reminder, user_id: userId })
      .select('id, type, title, time, description, done, icon')
      .single();

    if (error || !data) return fail(placeholder, error?.message ?? 'Could not create reminder.');
    return { data: data as Reminder, error: null };
  },
};

/**
 * ─── MEMORY SERVICE ─────────────────────────────────────────────────
 */

export const memoryService = {
  async getAll(): Promise<ApiResponse<Memory[]>> {
    const userId = await currentUserId();
    if (!userId) return fail([], 'Please log in to see your memories.');

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
    const placeholder: Memory = { ...memory, id: '' };
    if (!userId) return fail(placeholder, 'Please log in to add a memory.');

    const { data, error } = await supabase
      .from('memories')
      .insert({ ...memory, user_id: userId })
      .select('id, title, description, year, image, caption, detail')
      .single();

    if (error || !data) return fail(placeholder, error?.message ?? 'Could not save memory.');
    return { data: data as Memory, error: null };
  },
};

/**
 * ─── PEOPLE SERVICE ─────────────────────────────────────────────────
 */

export const peopleService = {
  async getAll(): Promise<ApiResponse<Person[]>> {
    const userId = await currentUserId();
    if (!userId) return fail([], 'Please log in to see your people.');

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
    const placeholder: Person = { ...person, id: '' };
    if (!userId) return fail(placeholder, 'Please log in to add a person.');

    const { data, error } = await supabase
      .from('people')
      .insert({ ...person, user_id: userId })
      .select('id, name, relationship, image, info, phone')
      .single();

    if (error || !data) return fail(placeholder, error?.message ?? 'Could not save person.');
    return { data: data as Person, error: null };
  },
};

/**
 * ─── GAME SERVICE ───────────────────────────────────────────────────
 * Shared app content — same rows for every signed-in user.
 */

export const gameService = {
  async getAll(): Promise<ApiResponse<Game[]>> {
    const { data, error } = await supabase
      .from('games')
      .select('id, title, description, icon, gradient')
      .order('created_at', { ascending: true });

    if (error) return fail([], error.message);
    return { data: (data ?? []) as Game[], error: null };
  },
};
