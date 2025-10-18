package com.basketballbooksy.controller;

import com.basketballbooksy.model.Trainer;
import com.basketballbooksy.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private TrainerRepository trainerRepository;

    @GetMapping("/pendingTrainers")
    public List<Trainer> getPendingTrainers() {
        return trainerRepository.findAll().stream()
            .filter(t -> !Boolean.TRUE.equals(t.getApproved()))
            .toList();
    }

    @PutMapping("/approveTrainer/{id}")
    public Trainer approveTrainer(@PathVariable Long id) {
        Trainer trainer = trainerRepository.findById(id).orElse(null);
        if (trainer != null) {
            trainer.setApproved(true);
            return trainerRepository.save(trainer);
        }
        return null;
    }
}
