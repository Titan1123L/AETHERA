const BASE_URL =
  "http://localhost:8080/api/history";


// GET TOKEN
function getToken() {

  return localStorage.getItem(
    "token"
  );
}


// GET HISTORY
export async function getHistory() {

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
      "Failed to fetch history"
    );
  }

  return response.json();
}


// ADD HISTORY
export async function addHistory(
  history: {
    city: string;
    lat: number;
    lon: number;
    country: string;
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
          history
        ),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to add history"
    );
  }

  return response.json();
}


// CLEAR HISTORY
export async function deleteHistoryItem(
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
      "Failed to delete history item"
    );
  }

  return true;
}