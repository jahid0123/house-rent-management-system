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
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class PropertyPostController {

    private final PropertyPostService propertyPostService;

    @PostMapping(value = "/post/property", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> postProperty(
            @RequestPart("property") @Valid PropertyPostDto propertyPostDto,
            @RequestPart("images") MultipartFile[] imageFiles) throws IOException {

            PropertyPost result = propertyPostService.postProperty(propertyPostDto, imageFiles);
            if (result != null )
                return new ResponseEntity<>(HttpStatus.CREATED);

        return ResponseEntity.badRequest().body("Something went wrong");
    }


//    @PostMapping("/post/property")
//    public ResponseEntity<?> postProperty(@Valid @RequestBody PropertyPostDto propertyPostDto) {
//        try {
//            PropertyPost result = propertyPostService.postProperty(propertyPostDto);
//            return ResponseEntity.ok(result);
//        } catch (RuntimeException e) {
//            System.out.println(propertyPostDto.toString());
//            System.out.println(e);
//            return ResponseEntity.badRequest().body("Something wrong");
//        }
//    }

    @GetMapping("/all/posted/property")
    public ResponseEntity<?> getAllPostedProperty() {

        List<GetPostedProperty> allProperty = propertyPostService.getAllPostedProperty();
        return ResponseEntity.ok(allProperty);
    }

    @GetMapping("/property/posted/me")
    public ResponseEntity<List<GetPostedProperty>> getMyPostedProperties(@RequestParam Long id) {
        List<GetPostedProperty> postedPropertyByMe = propertyPostService.allPropertyPostedByMe(id);

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
        return new ResponseEntity<>(HttpStatus.OK);

    }

    /*//property Image getting
    @GetMapping("/property/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads", filename);
            Resource resource = new UrlResource(file.toUri());

            if (!resource.exists()) return ResponseEntity.notFound().build();

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }*/


    @GetMapping("/property/image/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads").resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            // Try to determine the content type
            String contentType = Files.probeContentType(file);
            if (contentType == null) {
                contentType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
