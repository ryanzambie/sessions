package com.basketballbooksy.config;

import com.basketballbooksy.model.Trainer;
import com.basketballbooksy.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only load data if database is empty
        if (trainerRepository.count() == 0) {
            loadSampleTrainers();
        }
    }

    private void loadSampleTrainers() {
        // Trainer 1 - Michael Jordan
        Trainer trainer1 = new Trainer();
        trainer1.setName("Michael Jordan");
        trainer1.setBio("Former NBA superstar specializing in shooting fundamentals and mental toughness. Perfect for youth and adult players looking to elevate their game.");
        trainer1.setSpecialties("Shooting, All Around, Skills");
        trainer1.setLocation("Chicago, IL");
        trainer1.setRate(150.0);
        trainer1.setExperience(25);
        trainer1.setPhotoUrl("https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80");
        trainer1.setApproved(true);

        // Trainer 2 - Sarah Thompson
        Trainer trainer2 = new Trainer();
        trainer2.setName("Sarah Thompson");
        trainer2.setBio("Professional skills coach with 10+ years experience. Specializes in developing young players aged 8-16 with fundamentals and confidence building.");
        trainer2.setSpecialties("Skills, Youth Development");
        trainer2.setLocation("Los Angeles, CA");
        trainer2.setRate(75.0);
        trainer2.setExperience(10);
        trainer2.setPhotoUrl("https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80");
        trainer2.setApproved(true);

        // Trainer 3 - Coach Marcus Williams
        Trainer trainer3 = new Trainer();
        trainer3.setName("Coach Marcus Williams");
        trainer3.setBio("Former D1 college player focusing on strength and conditioning for basketball players. Expert in developing explosive power and endurance.");
        trainer3.setSpecialties("Strength and Conditioning, Live Play");
        trainer3.setLocation("Atlanta, GA");
        trainer3.setRate(100.0);
        trainer3.setExperience(15);
        trainer3.setPhotoUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80");
        trainer3.setApproved(true);

        // Trainer 4 - Jessica Chen
        Trainer trainer4 = new Trainer();
        trainer4.setName("Jessica Chen");
        trainer4.setBio("Elite shooting specialist who trained with NBA players. Perfect for players wanting to improve their 3-point shooting and free throw accuracy.");
        trainer4.setSpecialties("Shooting, Skills");
        trainer4.setLocation("San Francisco, CA");
        trainer4.setRate(120.0);
        trainer4.setExperience(8);
        trainer4.setPhotoUrl("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80");
        trainer4.setApproved(true);

        // Trainer 5 - Coach David Rodriguez
        Trainer trainer5 = new Trainer();
        trainer5.setName("Coach David Rodriguez");
        trainer5.setBio("High school varsity coach with 15 years experience. Specializes in team fundamentals, live game situations, and basketball IQ development.");
        trainer5.setSpecialties("All Around, Live Play, Skills");
        trainer5.setLocation("Miami, FL");
        trainer5.setRate(85.0);
        trainer5.setExperience(15);
        trainer5.setPhotoUrl("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80");
        trainer5.setApproved(true);

        // Save all trainers
        trainerRepository.save(trainer1);
        trainerRepository.save(trainer2);
        trainerRepository.save(trainer3);
        trainerRepository.save(trainer4);
        trainerRepository.save(trainer5);

        System.out.println("✅ Sample trainer data loaded successfully!");
    }
}