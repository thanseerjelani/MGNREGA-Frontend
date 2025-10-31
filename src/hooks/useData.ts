import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';


// Fetch states
export const useStates = () => {
  return useQuery({
    queryKey: ['states'],
    queryFn: api.getStates,
    staleTime: Infinity, // States rarely change
  });
};

// Fetch districts by state
export const useDistricts = (stateId: number | null) => {
  return useQuery({
    queryKey: ['districts', stateId],
    queryFn: () => api.getDistricts(stateId!),
    enabled: !!stateId, // Only fetch if stateId exists
  });
};

// Fetch performance data
export const usePerformance = (districtId: number | null) => {
  return useQuery({
    queryKey: ['performance', districtId],
    queryFn: () => api.getPerformance(districtId!),
    enabled: !!districtId,
  });
};

// Fetch comparison data
export const useComparison = (districtId: number | null) => {
  return useQuery({
    queryKey: ['comparison', districtId],
    queryFn: () => api.getComparison(districtId!),
    enabled: !!districtId,
  });
};