package com.jmjbrothers.spring.securtiy.authentication.controller;

import com.jmjbrothers.spring.securtiy.authentication.dto.BuyPackageDto;
import com.jmjbrothers.spring.securtiy.authentication.model.BuyPackage;
import com.jmjbrothers.spring.securtiy.authentication.service.BuyPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/user")
public class BuyPackageController {

    private final BuyPackageService transactionService;


    @PostMapping("/buy/package")
    public ResponseEntity<?> buyPackage(@RequestBody BuyPackageDto transactionDto){
        BuyPackage ct = transactionService.buyPackage(transactionDto);
        return new ResponseEntity<>(ct, HttpStatus.ACCEPTED);
    }

}
