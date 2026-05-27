package com.example.backend.repository;

import com.example.backend.model.Favorite;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository
        extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUserEmail(
            String userEmail
    );
    Favorite findByUserEmailAndLatAndLon(

        String userEmail,

        double lat,

        double lon
);
}