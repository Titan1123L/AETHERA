const BASE_URL =
  "http://localhost:8080/api/favorites";


// GET TOKEN
function getToken() {

  return localStorage.getItem(
    "token"
  );
}


// GET FAVORITES
export async function getFavorites() {

  const response =
    await fetch(
      BASE_URL,
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch favorites"
    );
  }

  return response.json();
}


// ADD FAVORITE
export async function addFavorite(
  favorite: {
    city: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }
) {

  const response =
    await fetch(
      BASE_URL,
      {
        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${getToken()}`
        },

        body: JSON.stringify(
          favorite
        ),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to add favorite"
    );
  }

  return response.json();
}


// DELETE FAVORITE
export async function deleteFavorite(
  id: number
) {

  const response =
    await fetch(
      `${BASE_URL}/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to delete favorite"
    );
  }

  return true;
}
