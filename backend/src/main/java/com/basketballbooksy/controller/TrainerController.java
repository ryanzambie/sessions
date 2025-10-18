package com.basketballbooksy.controller;

import com.basketballbooksy.model.Trainer;
import com.basketballbooksy.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {
    @Autowired
    private TrainerRepository trainerRepository;

    @GetMapping("")
    public List<Trainer> getApprovedTrainers() {
        return trainerRepository.findByApprovedTrue();
    }

    @GetMapping("/{id}")
    public Trainer getTrainer(@PathVariable Long id) {
        return trainerRepository.findById(id).orElse(null);
    }

    @PostMapping("")
    public Trainer createTrainer(@RequestBody Trainer trainer) {
        trainer.setApproved(false); // must be approved by admin
        return trainerRepository.save(trainer);
    }

    @PutMapping("/{id}/approve")
    public Trainer approveTrainer(@PathVariable Long id) {
        Trainer trainer = trainerRepository.findById(id).orElse(null);
        if (trainer != null) {
            trainer.setApproved(true);
            return trainerRepository.save(trainer);
        }
        return null;
    }
}
