import { useQuery } from '@tanstack/react-query';
import { http } from '@/api/http';

export function useNominalRoll() {
  return useQuery({
    queryKey: ['staff'],
    queryFn: () => http.get('/staff/').then((r) => r.data),
  });
}
