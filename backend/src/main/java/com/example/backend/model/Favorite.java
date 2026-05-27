package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favorites")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;

    private double lat;

    private double lon;

    private String country;
    private String state;

    // USER EMAIL
    private String userEmail;

    public Favorite() {
    }

    // GETTERS & SETTERS

    public String getState() {
        return state;
    }

    public void setState(
            String state) {
        this.state = state;
    }

    public Long getId() {
        return id;
    }

    public void setId(
            Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(
            String city) {
        this.city = city;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(
            double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(
            double lon) {
        this.lon = lon;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(
            String country) {
        this.country = country;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(
            String userEmail) {
        this.userEmail = userEmail;
    }
}