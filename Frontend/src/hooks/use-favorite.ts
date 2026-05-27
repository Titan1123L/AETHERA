import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../api/favorites";

export interface FavoriteCity {

  id: number;

  city: string;

  lat: number;

  lon: number;

  country: string;

  userEmail: string;
}

export function useFavorites() {

  const queryClient =
    useQueryClient();

  // FETCH FAVORITES
  const favoritesQuery =
    useQuery({

      queryKey: ["favorites"],

      queryFn: getFavorites,
    });

  // ADD FAVORITE
  const addFavoriteMutation =
    useMutation({

      mutationFn: addFavorite,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: ["favorites"],
        });
      },
    });

  // DELETE FAVORITE
  const deleteFavoriteMutation =
    useMutation({

      mutationFn: deleteFavorite,

      onSuccess: () => {

        queryClient.invalidateQueries({
          queryKey: ["favorites"],
        });
      },
    });

  return {

    favorites:
      favoritesQuery.data ?? [],

    isLoading:
      favoritesQuery.isLoading,

    addFavorite:
      addFavoriteMutation,

    deleteFavorite:
      deleteFavoriteMutation,

    // CHECK FAVORITE
    isFavorite: (
      lat: number,
      lon: number
    ) =>

      (
        favoritesQuery.data ?? []
      ).some(

        (city: FavoriteCity) =>

          city.lat === lat &&
          city.lon === lon
      ),
  };
}