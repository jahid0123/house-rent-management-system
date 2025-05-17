package com.jmjbrothers.spring.securtiy.authentication.repository;

import com.jmjbrothers.spring.securtiy.authentication.model.BuyPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//@Repository
//public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {
//    CreditPackage creditPackageFindById(Long packageId);
//}

@Repository
public interface BuyPackageRepository extends JpaRepository<BuyPackage, Long> {
    // Optional: this is already provided by JpaRepository
    Optional<BuyPackage> findById(Long id);
}
