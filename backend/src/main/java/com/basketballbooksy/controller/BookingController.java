package com.basketballbooksy.controller;

import com.basketballbooksy.model.Booking;
import com.basketballbooksy.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("")
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("requested");
        return bookingRepository.save(booking);
    }

    @PutMapping("/{id}/confirm")
    public Booking confirmBooking(@PathVariable Long id) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setStatus("confirmed");
            return bookingRepository.save(booking);
        }
        return null;
    }

    @PutMapping("/{id}/decline")
    public Booking declineBooking(@PathVariable Long id) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setStatus("declined");
            return bookingRepository.save(booking);
        }
        return null;
    }
}
