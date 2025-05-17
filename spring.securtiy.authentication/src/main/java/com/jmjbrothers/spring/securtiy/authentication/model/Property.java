package com.jmjbrothers.spring.securtiy.authentication.model;

import com.jmjbrothers.spring.securtiy.authentication.constants.Category;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@Entity
@Table(name = "r_property")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Category category;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "CLOB")
    private String description;

    @Column(columnDefinition = "CLOB")
    private String address;

    @Column(name = "is_available")
    private Boolean isAvailable = true;

    @Column(name = "rent_amount")
    private Integer rentAmount;

    @Column(name = "date_posted", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime datePosted = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        if (datePosted == null) {
            datePosted = LocalDateTime.now();
        }
    }
}
