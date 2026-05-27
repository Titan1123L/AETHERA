
const BASE_URL =
  "http://localhost:8080/api/auth";


// SIGNUP
export async function signup(
  name: string,
  email: string,
  password: string
) {

  const response = await fetch(
    `${BASE_URL}/signup`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  return response.text();
}

//login

export async function login(
  email: string,
 password: string
) {
  const response = await fetch(
    `${BASE_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  // Backend returns plain text JWT
  const token = await response.text();

  return token;
}