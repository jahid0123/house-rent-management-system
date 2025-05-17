package com.jmjbrothers.spring.securtiy.authentication.service;

import com.jmjbrothers.spring.securtiy.authentication.dto.PropertyPostDto;
import com.jmjbrothers.spring.securtiy.authentication.model.Property;
import com.jmjbrothers.spring.securtiy.authentication.model.PropertyPost;
import com.jmjbrothers.spring.securtiy.authentication.model.User;
import com.jmjbrothers.spring.securtiy.authentication.repository.PropertyPostRepository;
import com.jmjbrothers.spring.securtiy.authentication.repository.PropertyRepository;
import com.jmjbrothers.spring.securtiy.authentication.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PropertyPostService {

    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyPostRepository propertyPostRepository;


    @Transactional
    public PropertyPost postProperty(PropertyPostDto propertyPostDto) {
        User user = userRepository.findById(propertyPostDto.getUserID()).orElseThrow(
                ()-> new RuntimeException("User not found"));
        System.out.println(user.toString());

        if (user.getBalanceCredits()<10){
            System.out.println("No enough credit");
            throw new RuntimeException("Insufficient credits");
        }

        //Create new property
        Property property = new Property();
        property.setUser(user);
        property.setCategory(propertyPostDto.getCategory());
        property.setTitle(propertyPostDto.getTitle());
        property.setDescription(propertyPostDto.getDescription());
        property.setAddress(propertyPostDto.getAddress());
        property.setRentAmount(propertyPostDto.getRentAmount());

        propertyRepository.save(property);

        //deduct credit
        user.setBalanceCredits(user.getBalanceCredits()-10);
        userRepository.save(user);

        //Create new property post
        PropertyPost propertyPost = new PropertyPost();
        propertyPost.setUser(user);
        propertyPost.setProperty(property);
        propertyPost.setContactPerson(propertyPostDto.getContactPerson());
        propertyPost.setContactNumber(propertyPostDto.getContactNumber());
        propertyPost.setArea(propertyPostDto.getArea());
        propertyPost.setAvailableFrom(propertyPostDto.getAvailableFrom());

        return propertyPostRepository.save(propertyPost);
    }
}
