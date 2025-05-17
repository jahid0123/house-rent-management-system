package com.jmjbrothers.spring.securtiy.authentication.controller;

import com.jmjbrothers.spring.securtiy.authentication.dto.PropertyPostDto;
import com.jmjbrothers.spring.securtiy.authentication.model.PropertyPost;
import com.jmjbrothers.spring.securtiy.authentication.service.PropertyPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class PropertyPostController {

    private final PropertyPostService propertyPostService;


    @PostMapping("/post/property")
    public ResponseEntity<?> postProperty(@Valid @RequestBody PropertyPostDto propertyPostDto){
        try {
            PropertyPost result = propertyPostService.postProperty(propertyPostDto);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("User not found by id");
        }
    }
}
