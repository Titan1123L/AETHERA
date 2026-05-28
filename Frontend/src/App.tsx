import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import WeatherDashboard from "./pages/weather-dashboard";
import "./App.css";
import { ThemeProvider } from "./context/theme-provider";
import CityPage from "./pages/city-page";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoginPage from "@/pages/login-page";
import ProtectedRoute from "@/components/protected-route";
import SignupPage from "@/pages/signup-page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

function App() {
  const [setWeather] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/weather?lat=${lat}&lon=${lon}`,
      );

      const data = await response.json();

      setWeather(data);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <WeatherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/city/:cityName"
                element={
                  <ProtectedRoute>
                    <CityPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
