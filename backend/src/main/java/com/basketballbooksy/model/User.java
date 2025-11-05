package com.basketballbooksy.model;

import javax.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String name;
    private String role; // "student" or "trainer" or "admin"
    private String googleId;
    // ...getters/setters...
}
