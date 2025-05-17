package com.jmjbrothers.spring.securtiy.authentication.repository;

import com.jmjbrothers.spring.securtiy.authentication.model.PropertyPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyPostRepository extends JpaRepository<PropertyPost, Long> {
}
