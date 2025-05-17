package com.jmjbrothers.spring.securtiy.authentication.service;

import com.jmjbrothers.spring.securtiy.authentication.model.CreditPackage;
import com.jmjbrothers.spring.securtiy.authentication.repository.CreditPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditPackageService {

    @Autowired
    private CreditPackageRepository packageRepository;


    public CreditPackage addCreditPackage(CreditPackage cPackage) {
        CreditPackage addPackage = packageRepository.save(cPackage);
        if (addPackage == null){
            throw new RuntimeException("Credit package not added!");
        }
        return addPackage;

    }

    public List<CreditPackage> allCreditPackage() {

        return packageRepository.findAll();
    }
}
