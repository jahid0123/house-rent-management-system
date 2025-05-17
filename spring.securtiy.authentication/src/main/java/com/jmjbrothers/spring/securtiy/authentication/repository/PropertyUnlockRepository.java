package com.jmjbrothers.spring.securtiy.authentication.repository;

import com.jmjbrothers.spring.securtiy.authentication.model.PropertyUnlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyUnlockRepository extends JpaRepository<PropertyUnlock, Long> {

}
