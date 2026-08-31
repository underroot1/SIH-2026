import { useState, useEffect, useCallback } from 'react';
import type { Person } from '@/data/mockData';
import { peopleService } from '@/services/api';

interface UsePeopleResult {
  people: Person[];
  loading: boolean;
  error: string | null;
  addPerson: (person: Omit<Person, 'id'>) => void;
  refresh: () => void;
}

export function usePeople(): UsePeopleResult {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await peopleService.getAll();
      if (res.error) {
        setError(res.error);
      } else {
        setPeople(res.data);
      }
    } catch {
      setError('Could not load people. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const addPerson = useCallback((person: Omit<Person, 'id'>) => {
    peopleService.create(person).then((res) => {
      if (res.data) setPeople((ps) => [...ps, res.data]);
    });
  }, []);

  return { people, loading, error, addPerson, refresh: fetchPeople };
}
