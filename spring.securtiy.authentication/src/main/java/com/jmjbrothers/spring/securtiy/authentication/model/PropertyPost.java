package com.jmjbrothers.spring.securtiy.authentication.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "r_property_post")
public class PropertyPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "rent_area", nullable = false)
    private String area;

    @Column(name = "contact_person", nullable = false)
    private String contactPerson;

    @Column(name = "available_from", nullable = false)
    private LocalDate availableFrom;

    @Column(name = "credits_used", nullable = false, columnDefinition = "int default 10")
    private Integer creditsUsed = 10;

    @Column(name = "date_posted", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime datePosted;

    @PrePersist
    public void prePersist() {
        if (datePosted == null) {
            datePosted = LocalDateTime.now();
        }
    }

    // Getters and Setters
}
