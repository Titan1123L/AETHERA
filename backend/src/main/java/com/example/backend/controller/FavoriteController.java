package com.example.backend.controller;

import com.example.backend.model.Favorite;

import com.example.backend.repository.FavoriteRepository;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/favorites")

@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

        private final FavoriteRepository favoriteRepository;

        public FavoriteController(
                        FavoriteRepository favoriteRepository) {

                this.favoriteRepository = favoriteRepository;
        }

        // GET FAVORITES
        @GetMapping
        public List<Favorite> getFavorites(
                        HttpServletRequest request) {

                String email = (String) request.getAttribute(
                                "email");

                if (email == null) {

                        return List.of();
                }

                return favoriteRepository
                                .findByUserEmail(email);
        }

        // ADD FAVORITE
        @PostMapping
        public Favorite addFavorite(
                        @RequestBody Favorite favorite,

                        HttpServletRequest request) {

                String email = (String) request.getAttribute(
                                "email");

                favorite.setUserEmail(email);
                Favorite existingFavorite = favoriteRepository
                                .findByUserEmailAndLatAndLon(
                                                email,
                                                favorite.getLat(),
                                                favorite.getLon());

                if (existingFavorite != null) {

                        return existingFavorite;
                }

                return favoriteRepository.save(
                                favorite);
        }

        // DELETE FAVORITE
        @DeleteMapping("/{id}")
        public void deleteFavorite(
                        @PathVariable Long id) {

                favoriteRepository.deleteById(id);
        }
}