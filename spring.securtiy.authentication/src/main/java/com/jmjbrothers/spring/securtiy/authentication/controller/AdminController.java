package com.jmjbrothers.spring.securtiy.authentication.controller;

import com.jmjbrothers.spring.securtiy.authentication.model.CreditPackage;
import com.jmjbrothers.spring.securtiy.authentication.model.User;
import com.jmjbrothers.spring.securtiy.authentication.service.CreditPackageService;
import com.jmjbrothers.spring.securtiy.authentication.service.UserInfoDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/admin")
public class AdminController {


    private final UserInfoDetailsService userInfoDetailsService;
    private final CreditPackageService packageService;


    //Get all user access control by Admin
    @GetMapping("/alluser")
    public List<User> getAllUser() {
        return userInfoDetailsService.getAllUser();
    }

    //Delete user by id access control by admin
    @DeleteMapping("/delete/{id}")
    public String deleteUserById(@PathVariable Long id) {
        return userInfoDetailsService.deleteUserById(id);
    }

    //Credit Package Creation by the Admin
    @PostMapping("/add/creditpackage")
    public ResponseEntity<?> addCreditPackage(@RequestBody CreditPackage cPackage) {
        CreditPackage creditPackage = packageService.addCreditPackage(cPackage);
        return new ResponseEntity<>(creditPackage, HttpStatus.CREATED);
    }

}
