package com.basketballbooksy.repository;

import com.basketballbooksy.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    List<Trainer> findByApprovedTrue();
}
