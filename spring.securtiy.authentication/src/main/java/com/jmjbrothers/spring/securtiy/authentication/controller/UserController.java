package com.jmjbrothers.spring.securtiy.authentication.controller;

import com.jmjbrothers.spring.securtiy.authentication.model.CreditPackage;
import com.jmjbrothers.spring.securtiy.authentication.service.CreditPackageService;
import com.jmjbrothers.spring.securtiy.authentication.service.UserInfoDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class UserController {


   private final UserInfoDetailsService userInfoDetailsService;
   private final CreditPackageService creditPackageService;


    @GetMapping("/all/credit/package")
    public ResponseEntity<?> allCreditPackage(){
        List<CreditPackage> creditPackage= creditPackageService.allCreditPackage();
        return new ResponseEntity<>(creditPackage, HttpStatus.OK);
    }
}
