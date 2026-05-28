
const BASE_URL =
  `${import.meta.env.VITE_API_URL}/api/auth`;


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

if (
  token === "User not found" ||
  token === "Invalid password"
) {
  throw new Error(token);
}

localStorage.setItem(
  "token",
  token.trim()
);

return token; 
}