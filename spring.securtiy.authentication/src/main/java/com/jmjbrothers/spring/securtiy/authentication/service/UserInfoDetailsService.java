package com.jmjbrothers.spring.securtiy.authentication.service;

import com.jmjbrothers.spring.securtiy.authentication.constants.Role;
import com.jmjbrothers.spring.securtiy.authentication.dto.RegisterRequest;
import com.jmjbrothers.spring.securtiy.authentication.model.User;
import com.jmjbrothers.spring.securtiy.authentication.model.UserInfoDetails;
import com.jmjbrothers.spring.securtiy.authentication.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserInfoDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userDetails = userRepository.findByEmail(email).orElseThrow(()->
                new UsernameNotFoundException("User not found with the email: "+ email));

        return new UserInfoDetails(userDetails);
    }

    @Transactional
    public User registerNewUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("User already exist with the email: " + request.getEmail());
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        return userRepository.save(user);

    }

    @Transactional
    public List<User> getAllUser() {

        return userRepository.findAll();
    }

    @Transactional
    public String deleteUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()){
            userRepository.deleteById(id);
            return "User deleted successfully!";
        }else {
            return "User not found by the id: " + id;
        }
    }

    @Transactional
    public User userFindById(Long id){
        return userRepository.findById(id).orElse(null);
    }
}
