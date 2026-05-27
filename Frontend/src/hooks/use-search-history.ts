import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getHistory,
  addHistory,
  deleteHistoryItem,
} from "@/api/search-history";

export interface SearchHistoryItem {

  id: number;

  city: string;

  lat: number;

  lon: number;

  country: string;

  searchedAt: number;
}

export function useSearchHistory() {

  const queryClient =
    useQueryClient();

  // FETCH HISTORY
  const historyQuery =
    useQuery({

      queryKey: ["search-history"],

      queryFn: getHistory,
    });

  // ADD HISTORY
  const addMutation =
    useMutation({

      mutationFn: addHistory,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "search-history",
          ],
        });
      },
    });

  // DELETE HISTORY ITEM
  const deleteMutation  =
    useMutation({

      mutationFn: deleteHistoryItem,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: [
            "search-history",
          ],
        });
      },
    });

  return {

    history:
      historyQuery.data ?? [],

    isLoading:
      historyQuery.isLoading,

    addToHistory:
      addMutation,

    deleteHistory:
      deleteMutation,
  };
}
