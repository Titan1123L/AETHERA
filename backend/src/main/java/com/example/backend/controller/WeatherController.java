package com.example.backend.controller;

import com.example.backend.services.WeatherService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(
            WeatherService weatherService
    ) {
        this.weatherService = weatherService;
    }

    @GetMapping("/current")
    public String getCurrentWeather(
            @RequestParam double lat,
            @RequestParam double lon
    ) {

        return weatherService.getCurrentWeather(
                lat,
                lon
        );
    }

    @GetMapping("/forecast")
    public String getForecast(
            @RequestParam double lat,
            @RequestParam double lon
    ) {

        return weatherService.getForecast(
                lat,
                lon
        );
    }

    @GetMapping("/reverse-geocode")
    public String reverseGeocode(
            @RequestParam double lat,
            @RequestParam double lon
    ) {

        return weatherService.reverseGeocode(
                lat,
                lon
        );
    }

    @GetMapping("/search")
    public String searchLocations(
            @RequestParam String query
    ) {

        return weatherService.searchLocations(
                query
        );
    }
}