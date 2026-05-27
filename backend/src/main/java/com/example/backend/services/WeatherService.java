package com.example.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public WeatherService(
            RestTemplate restTemplate
    ) {
        this.restTemplate = restTemplate;
    }

    public String getCurrentWeather(
            double lat,
            double lon
    ) {

        String url =
                "https://api.openweathermap.org/data/2.5/weather?lat="
                        + lat
                        + "&lon="
                        + lon
                        + "&appid="
                        + apiKey
                        + "&units=metric";

        return restTemplate.getForObject(
                url,
                String.class
        );
    }

    public String getForecast(
            double lat,
            double lon
    ) {

        String url =
                "https://api.openweathermap.org/data/2.5/forecast?lat="
                        + lat
                        + "&lon="
                        + lon
                        + "&appid="
                        + apiKey
                        + "&units=metric";

        return restTemplate.getForObject(
                url,
                String.class
        );
    }

    public String reverseGeocode(
            double lat,
            double lon
    ) {

        String url =
                "https://api.openweathermap.org/geo/1.0/reverse?lat="
                        + lat
                        + "&lon="
                        + lon
                        + "&limit=1&appid="
                        + apiKey;

        return restTemplate.getForObject(
                url,
                String.class
        );
    }

    public String searchLocations(
            String query
    ) {

        String url =
                "https://api.openweathermap.org/geo/1.0/direct?q="
                        + query
                        + "&limit=5&appid="
                        + apiKey;

        return restTemplate.getForObject(
                url,
                String.class
        );
    }
}