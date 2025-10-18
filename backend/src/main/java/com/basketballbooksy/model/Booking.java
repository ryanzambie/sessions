package com.basketballbooksy.model;

import javax.persistence.*;

@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User student;
    @ManyToOne
    private Trainer trainer;
    private String status; // "requested", "confirmed", "declined"
    private String notes;
    // ...getters/setters...
}
