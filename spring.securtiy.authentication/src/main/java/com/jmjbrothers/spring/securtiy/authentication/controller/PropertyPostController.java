package com.jmjbrothers.spring.securtiy.authentication.controller;

import com.jmjbrothers.spring.securtiy.authentication.dto.GetPostedProperty;
import com.jmjbrothers.spring.securtiy.authentication.dto.MyPostPropertyResponseDto;
import com.jmjbrothers.spring.securtiy.authentication.dto.PropertyPostDto;
import com.jmjbrothers.spring.securtiy.authentication.dto.UpdateMyPostedPropertyDto;
import com.jmjbrothers.spring.securtiy.authentication.model.PropertyPost;
import com.jmjbrothers.spring.securtiy.authentication.model.PropertyUnlock;
import com.jmjbrothers.spring.securtiy.authentication.service.PropertyPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class PropertyPostController {

    private final PropertyPostService propertyPostService;


    @PostMapping("/post/property")
    public ResponseEntity<?> postProperty(@Valid @RequestBody PropertyPostDto propertyPostDto) {
        try {
            PropertyPost result = propertyPostService.postProperty(propertyPostDto);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            System.out.println(propertyPostDto.toString());
            System.out.println(e);
            return ResponseEntity.badRequest().body("Something wrong");
        }
    }

    @GetMapping("/all/posted/property")
    public ResponseEntity<?> getAllPostedProperty() {

        List<GetPostedProperty> allProperty = propertyPostService.getAllPostedProperty();
        return ResponseEntity.ok(allProperty);
    }

    @GetMapping("/property/posted/me")
    public ResponseEntity<List<MyPostPropertyResponseDto>> getMyPostedProperties(@RequestParam Long id) {
        List<MyPostPropertyResponseDto> postedPropertyByMe = propertyPostService.allPropertyPostedByMe(id);

        return new ResponseEntity<>(postedPropertyByMe, HttpStatus.OK);

    }

    @DeleteMapping("/property/posted/delete")
    public ResponseEntity<?> deleteMyPostedProperties(@RequestParam Long id) {
        String deleteMyPostedProperties = propertyPostService.deleteMyPostedProperties(id);

        return new ResponseEntity<>(deleteMyPostedProperties, HttpStatus.OK);

    }

    @PutMapping("/property/posted/update")
    public ResponseEntity<?> updateMyPostedProperties(@RequestBody UpdateMyPostedPropertyDto propertyDto) {
        MyPostPropertyResponseDto updateMyPostedProperties = propertyPostService.updateMyPostedProperties(propertyDto);
        return new ResponseEntity<>(updateMyPostedProperties, HttpStatus.OK);

    }


}
