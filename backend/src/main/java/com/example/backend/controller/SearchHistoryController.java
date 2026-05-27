package com.example.backend.controller;

import com.example.backend.model.SearchHistory;
import com.example.backend.repository.SearchHistoryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController

@RequestMapping("/api/history")

@CrossOrigin(
        origins = "http://localhost:5173"
)
public class SearchHistoryController {

    private final SearchHistoryRepository
            historyRepository;

    public SearchHistoryController(
            SearchHistoryRepository
                    historyRepository
    ) {

        this.historyRepository =
                historyRepository;
    }

    @GetMapping
    public List<SearchHistory>
    getHistory(
            HttpServletRequest request
    ) {

        String email =
                (String)
                        request.getAttribute(
                                "email"
                        );

        if (email == null) {

            return List.of();
        }

        return historyRepository
                .findByUserEmailOrderBySearchedAtDesc(
                        email
                );
    }

    @PostMapping
    public SearchHistory addHistory(
            @RequestBody
            SearchHistory history,

            HttpServletRequest request
    ) {

        String email =
                (String)
                        request.getAttribute(
                                "email"
                        );

        history.setUserEmail(email);

        history.setSearchedAt(
                System.currentTimeMillis()
        );

        return historyRepository.save(
                history
        );
    }

   
    @DeleteMapping("/{id}")

public void deleteHistoryItem(

        @PathVariable Long id
) {  System.out.println(
            "Deleting history item: " + id
    );

    historyRepository.deleteById(id);

    System.out.println(
            "Deleted successfully"
    );
}
}
