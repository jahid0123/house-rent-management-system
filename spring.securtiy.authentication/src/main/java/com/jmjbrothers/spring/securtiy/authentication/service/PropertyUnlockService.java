package com.jmjbrothers.spring.securtiy.authentication.service;


import com.jmjbrothers.spring.securtiy.authentication.dto.PropertyUnlockDto;
import com.jmjbrothers.spring.securtiy.authentication.model.PropertyPost;
import com.jmjbrothers.spring.securtiy.authentication.model.PropertyUnlock;
import com.jmjbrothers.spring.securtiy.authentication.model.User;
import com.jmjbrothers.spring.securtiy.authentication.repository.PropertyPostRepository;
import com.jmjbrothers.spring.securtiy.authentication.repository.PropertyUnlockRepository;
import com.jmjbrothers.spring.securtiy.authentication.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyUnlockService {

    private final PropertyUnlockRepository propertyUnlockRepository;
    private final UserRepository userRepository;
    private final PropertyPostRepository propertyPostRepository;


    @Transactional
    public PropertyUnlock propertyUnlock(PropertyUnlockDto propertyUnlockDto) {
        Long userId = propertyUnlockDto.getUserId();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("User not found"));
        System.out.println(user.toString());

        Long propertyPostId = propertyUnlockDto.getPropertyPostId();
        PropertyPost propertyPost = propertyPostRepository.findById(propertyPostId).orElseThrow(
                () -> new RuntimeException("PropertyPost not found"));
        System.out.println(propertyPost.toString());

        if (user.getBalanceCredits()<5){
            System.out.println("No enough credit");
            throw new RuntimeException("Insufficient credits");
        }
        user.setBalanceCredits(user.getBalanceCredits()-5);
        userRepository.save(user);

        PropertyUnlock propertyUnlock = new PropertyUnlock();
        propertyUnlock.setUser(user);
        propertyUnlock.setPropertyPost(propertyPost);

        return propertyUnlockRepository.save(propertyUnlock);
    }

    @Transactional
    public List<PropertyUnlock> allPropertyUnlockById(Long id) {
        List<PropertyUnlock> allPropertyUnlock = propertyUnlockRepository.findAllById(Collections.singleton(id));

        return allPropertyUnlock;
    }
}

