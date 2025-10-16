package com.basketballbooksy.model;

public class Trainer {
    private Long id;
    private String name;
    private String photoUrl;
    private String bio;
    private String[] specialties;
    private int experience;
    private String location;
    private double rate;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhotoUrl() { return photoUrl; }
    public void setPhotoUrl(String photoUrl) { this.photoUrl = photoUrl; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String[] getSpecialties() { return specialties; }
    public void setSpecialties(String[] specialties) { this.specialties = specialties; }
    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public double getRate() { return rate; }
    public void setRate(double rate) { this.rate = rate; }
}
