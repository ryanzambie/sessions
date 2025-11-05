package com.basketballbooksy.service;

import com.basketballbooksy.model.Trainer;
import com.basketballbooksy.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TrainerService {
    
    @Autowired
    private TrainerRepository trainerRepository;
    
    public List<Trainer> getAllApprovedTrainers() {
        return trainerRepository.findByApprovedTrue();
    }
    
    public Optional<Trainer> getTrainerById(Long id) {
        return trainerRepository.findById(id);
    }
    
    public List<Trainer> searchTrainers(String query) {
        List<Trainer> allTrainers = trainerRepository.findByApprovedTrue();
        
        if (query == null || query.trim().isEmpty()) {
            return allTrainers;
        }
        
        String searchTerm = query.toLowerCase().trim();
        
        return allTrainers.stream()
            .filter(trainer -> 
                (trainer.getName() != null && trainer.getName().toLowerCase().contains(searchTerm)) ||
                (trainer.getBio() != null && trainer.getBio().toLowerCase().contains(searchTerm)) ||
                (trainer.getSpecialties() != null && trainer.getSpecialties().toLowerCase().contains(searchTerm)) ||
                (trainer.getLocation() != null && trainer.getLocation().toLowerCase().contains(searchTerm))
            )
            .collect(Collectors.toList());
    }
    
    public List<Trainer> filterTrainers(String location, Double minRate, Double maxRate, String specialty) {
        List<Trainer> trainers = trainerRepository.findByApprovedTrue();
        
        return trainers.stream()
            .filter(trainer -> {
                boolean matches = true;
                
                if (location != null && !location.trim().isEmpty()) {
                    matches = matches && trainer.getLocation() != null && 
                             trainer.getLocation().toLowerCase().contains(location.toLowerCase());
                }
                
                if (minRate != null) {
                    matches = matches && trainer.getRate() >= minRate;
                }
                
                if (maxRate != null) {
                    matches = matches && trainer.getRate() <= maxRate;
                }
                
                if (specialty != null && !specialty.trim().isEmpty()) {
                    matches = matches && trainer.getSpecialties() != null && 
                             trainer.getSpecialties().toLowerCase().contains(specialty.toLowerCase());
                }
                
                return matches;
            })
            .collect(Collectors.toList());
    }
    
    public Trainer saveTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }
    
    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }
}