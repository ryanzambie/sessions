package com.basketballbooksy.controller;

import com.basketballbooksy.model.Trainer;
import com.basketballbooksy.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:5173") // Allow React app to connect
public class TrainerController {
    
    @Autowired
    private TrainerService trainerService;

    @GetMapping("")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        List<Trainer> trainers = trainerService.getAllApprovedTrainers();
        return ResponseEntity.ok(trainers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainer> getTrainer(@PathVariable Long id) {
        Optional<Trainer> trainer = trainerService.getTrainerById(id);
        return trainer.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Trainer>> searchTrainers(@RequestParam String query) {
        List<Trainer> trainers = trainerService.searchTrainers(query);
        return ResponseEntity.ok(trainers);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Trainer>> filterTrainers(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double minRate,
            @RequestParam(required = false) Double maxRate,
            @RequestParam(required = false) String specialty) {
        
        List<Trainer> trainers = trainerService.filterTrainers(location, minRate, maxRate, specialty);
        return ResponseEntity.ok(trainers);
    }

    @PostMapping("")
    public ResponseEntity<Trainer> createTrainer(@RequestBody Trainer trainer) {
        trainer.setApproved(false); // must be approved by admin
        Trainer savedTrainer = trainerService.saveTrainer(trainer);
        return ResponseEntity.ok(savedTrainer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable Long id, @RequestBody Trainer trainer) {
        Optional<Trainer> existingTrainer = trainerService.getTrainerById(id);
        if (existingTrainer.isPresent()) {
            trainer.setId(id);
            Trainer updatedTrainer = trainerService.saveTrainer(trainer);
            return ResponseEntity.ok(updatedTrainer);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Trainer> approveTrainer(@PathVariable Long id) {
        Optional<Trainer> trainerOpt = trainerService.getTrainerById(id);
        if (trainerOpt.isPresent()) {
            Trainer trainer = trainerOpt.get();
            trainer.setApproved(true);
            Trainer approvedTrainer = trainerService.saveTrainer(trainer);
            return ResponseEntity.ok(approvedTrainer);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        Optional<Trainer> trainer = trainerService.getTrainerById(id);
        if (trainer.isPresent()) {
            trainerService.deleteTrainer(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
