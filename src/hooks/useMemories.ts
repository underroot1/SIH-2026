import { useState, useEffect, useCallback } from 'react';
import type { Memory } from '@/data/mockData';
import { memoryService } from '@/services/api';

interface UseMemoriesResult {
  memories: Memory[];
  loading: boolean;
  error: string | null;
  addMemory: (memory: Omit<Memory, 'id'>) => void;
  refresh: () => void;
}

export function useMemories(): UseMemoriesResult {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await memoryService.getAll();
      if (res.error) {
        setError(res.error);
      } else {
        setMemories(res.data);
      }
    } catch {
      setError('Could not load memories. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const addMemory = useCallback((memory: Omit<Memory, 'id'>) => {
    memoryService.create(memory).then((res) => {
      if (res.data) setMemories((ms) => [...ms, res.data]);
    });
  }, []);

  return { memories, loading, error, addMemory, refresh: fetchMemories };
}
