package com.app.ecommerce.controller;

import com.app.ecommerce.dto.*;
import com.app.ecommerce.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private UserService userService;
    Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

//    @GetMapping("/user/{username}")
//    public User getUser(@PathVariable String username){
//        return userService.findUserByName(username);
//    }

    @PostMapping("/registerUser")
    public UserDto registerNewUser(@RequestBody @Valid UserDto userDto){
        return userService.registerNewUser(userDto);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/admin")
    public String forAdmin(){
        return "this is for admin";
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("/user")
    public String forUser(){
        return "this is for user";
    }

    @PostMapping("/forgot-password")
    public SimpleMessageResponseDto forgotPassword(@RequestBody String emailOrUsername) throws MessagingException {
        return userService.forgotPassword(emailOrUsername);
    }

    @PostMapping("/verify-otp")
    public Boolean VerifyOtp(@RequestBody OtpDto otp){
        return userService.verifyOtp(otp);
    }

    @PostMapping("/change-password")
    public SimpleMessageResponseDto changePassword(@RequestBody ChangePasswordDto changePasswordDto){
        return userService.changePassword(changePasswordDto);
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("/getUserName")
    public String getUserName(Authentication authentication){
        return authentication.getName();
    }

}
