package com.jmjbrothers.spring.securtiy.authentication.service;

import com.jmjbrothers.spring.securtiy.authentication.dto.*;
import com.jmjbrothers.spring.securtiy.authentication.model.Property;
import com.jmjbrothers.spring.securtiy.authentication.model.PropertyPost;
import com.jmjbrothers.spring.securtiy.authentication.model.User;
import com.jmjbrothers.spring.securtiy.authentication.repository.PropertyPostRepository;
import com.jmjbrothers.spring.securtiy.authentication.repository.PropertyRepository;
import com.jmjbrothers.spring.securtiy.authentication.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        property.setDivision(propertyPostDto.getDivision());
        property.setDistrict(propertyPostDto.getDistrict());
        property.setThana(propertyPostDto.getThana());
        property.setSection(propertyPostDto.getSection());
        property.setRoadNumber(propertyPostDto.getRoadNumber());
        property.setHouseNumber(propertyPostDto.getHouseNumber());

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


    @Transactional
    public List<GetPostedProperty> getAllPostedProperty() {

        List<PropertyPost> allPostedProperty = propertyPostRepository.findAll();

        //this is the simple way but Difficult to understand
        List<GetPostedProperty> getPostedPropertyList
                = allPostedProperty.stream().map(this::getPostedPropertyMapped).collect(Collectors.toList());

        return getPostedPropertyList;


/*        //the easy way to mapped list PropertyPost List to GetPostedProperty List
        List<GetPostedProperty> getPostedPropertyList = new ArrayList<>();
        for (PropertyPost property : allPostedProperty) {
            GetPostedProperty dto = getPostedPropertyMapped(property);  // convert it
            getPostedPropertyList.add(dto);                         // add to new list
        }

        return getPostedPropertyList;*/
    }


    //Mapped method PropertyPost class to GetPostedProperty
    private GetPostedProperty getPostedPropertyMapped(PropertyPost property){
        GetPostedProperty getPostedProperty = new GetPostedProperty();

        getPostedProperty.setId(property.getId());
        getPostedProperty.setCategory(property.getProperty().getCategory());
        getPostedProperty.setTitle(property.getProperty().getTitle());
        getPostedProperty.setDescription(property.getProperty().getDescription());
        getPostedProperty.setIsAvailable(property.getProperty().getIsAvailable());
        getPostedProperty.setRentAmount(property.getProperty().getRentAmount());
        getPostedProperty.setDatePosted(property.getDatePosted());
        getPostedProperty.setAvailableFrom(property.getAvailableFrom());
        getPostedProperty.setDivision(property.getProperty().getDivision());
        getPostedProperty.setDistrict(property.getProperty().getDistrict());
        getPostedProperty.setThana(property.getProperty().getThana());
        getPostedProperty.setSection(property.getProperty().getSection());

        return getPostedProperty;
    }

    @Transactional
    public List<MyPostPropertyResponseDto> allPropertyPostedByMe(Long id) {
        List<PropertyPost> allPropertyUnlock = propertyPostRepository.findAllByUserId(id);

        List<MyPostPropertyResponseDto> myAllProperty = allPropertyUnlock.stream().map(this::myPostPropertyResponseDto).collect(Collectors.toList());
        return myAllProperty;
    }




    private MyPostPropertyResponseDto myPostPropertyResponseDto (PropertyPost propertyPost){
        MyPostPropertyResponseDto myPost = new MyPostPropertyResponseDto();
        myPost.setId(propertyPost.getId());
        myPost.setContactNumber(propertyPost.getContactNumber());
        myPost.setContactPerson(propertyPost.getContactPerson());
        myPost.setArea(propertyPost.getArea());
        myPost.setAvailableFrom(propertyPost.getAvailableFrom());
        myPost.setCategory(propertyPost.getProperty().getCategory());
        myPost.setTitle(propertyPost.getProperty().getTitle());
        myPost.setDescription(propertyPost.getProperty().getDescription());
        myPost.setIsAvailable(propertyPost.getProperty().getIsAvailable());
        myPost.setRentAmount(propertyPost.getProperty().getRentAmount());
        myPost.setDatePosted(propertyPost.getProperty().getDatePosted());
        myPost.setDivision(propertyPost.getProperty().getDivision());
        myPost.setDistrict(propertyPost.getProperty().getDistrict());
        myPost.setThana(propertyPost.getProperty().getThana());
        myPost.setSection(propertyPost.getProperty().getSection());
        myPost.setRoadNumber(propertyPost.getProperty().getRoadNumber());
        myPost.setHouseNumber(propertyPost.getProperty().getHouseNumber());
        myPost.setAddress(propertyPost.getProperty().getAddress());

        return myPost;
    }

    @Transactional
    public String deleteMyPostedProperties(Long id) {
        PropertyPost post = propertyPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // First delete the post that holds the foreign key
        propertyPostRepository.deleteById(id);

        // Then delete the property if needed (and if not used elsewhere)
        propertyRepository.deleteById(post.getProperty().getId());

        return "Post deleted successfully!";
    }
    /*@Transactional
    public String deleteMyPostedProperties(Long id) {
        PropertyPost post= propertyPostRepository.findById(id).orElse(null);
        propertyRepository.deleteById(post.getProperty().getId());
        propertyPostRepository.deleteById(id);
        return "Post deleted successfully!";
    }*/

    public MyPostPropertyResponseDto updateMyPostedProperties(UpdateMyPostedPropertyDto propertyDto) {
        PropertyPost propertyPost = propertyPostRepository.findById(propertyDto.getPostId()).orElseThrow(
                ()->new RuntimeException("Property not found with id "+propertyDto.getPostId()));

        Property findProperty = propertyRepository.findById(propertyPost.getProperty().getId()).orElse(null);
        findProperty.setCategory(propertyDto.getCategory());
        findProperty.setTitle(propertyDto.getTitle());
        findProperty.setDescription(propertyDto.getDescription());
        findProperty.setRentAmount(propertyDto.getRentAmount());
        findProperty.setDivision(propertyDto.getDivision());
        findProperty.setDistrict(propertyDto.getDistrict());
        findProperty.setThana(propertyDto.getThana());
        findProperty.setSection(propertyDto.getSection());
        findProperty.setRoadNumber(propertyDto.getRoadNumber());
        findProperty.setHouseNumber(propertyDto.getHouseNumber());
        findProperty.setAddress(propertyDto.getAddress());

        propertyRepository.save(findProperty);

        propertyPost.setContactNumber(propertyDto.getContactNumber());
        propertyPost.setContactPerson(propertyDto.getContactPerson());
        propertyPost.setArea(propertyDto.getArea());
        propertyPost.setAvailableFrom(propertyDto.getAvailableFrom());


        return myPostPropertyResponseDto(propertyPostRepository.save(propertyPost));
    }


    @Transactional
    public List<PostedPropertyResponseDto> allPostedProperty() {
        List<PropertyPost> propertyPosts = propertyPostRepository.findAll();
        List<PostedPropertyResponseDto> myAllProperty = propertyPosts.stream().map(this::postedPropertyResponseDto).collect(Collectors.toList());
        return myAllProperty;
    }

    private PostedPropertyResponseDto  postedPropertyResponseDto (PropertyPost propertyPost){
        PostedPropertyResponseDto myPost = new PostedPropertyResponseDto();
        myPost.setPostId(propertyPost.getId());
        myPost.setUserId(propertyPost.getUser().getId());
        myPost.setContactNumber(propertyPost.getContactNumber());
        myPost.setContactPerson(propertyPost.getContactPerson());
        myPost.setArea(propertyPost.getArea());
        myPost.setAvailableFrom(propertyPost.getAvailableFrom());
        myPost.setCategory(propertyPost.getProperty().getCategory());
        myPost.setTitle(propertyPost.getProperty().getTitle());
        myPost.setDescription(propertyPost.getProperty().getDescription());
        myPost.setIsAvailable(propertyPost.getProperty().getIsAvailable());
        myPost.setRentAmount(propertyPost.getProperty().getRentAmount());
        myPost.setDatePosted(propertyPost.getProperty().getDatePosted());
        myPost.setDivision(propertyPost.getProperty().getDivision());
        myPost.setDistrict(propertyPost.getProperty().getDistrict());
        myPost.setThana(propertyPost.getProperty().getThana());
        myPost.setSection(propertyPost.getProperty().getSection());
        myPost.setRoadNumber(propertyPost.getProperty().getRoadNumber());
        myPost.setHouseNumber(propertyPost.getProperty().getHouseNumber());
        myPost.setAddress(propertyPost.getProperty().getAddress());

        return myPost;
    }

    @Transactional
    public PropertyPost updatePostedProperty(PropertyPostUpdateDto post) {

        PropertyPost propertyPost = propertyPostRepository.findById(post.getPostId()).orElse(null);
        Property property = propertyPost.getProperty();
        property.setIsAvailable(post.getIsAvailable());
        propertyPost.setProperty(property);
        return propertyPostRepository.save(propertyPost);

    }
}
