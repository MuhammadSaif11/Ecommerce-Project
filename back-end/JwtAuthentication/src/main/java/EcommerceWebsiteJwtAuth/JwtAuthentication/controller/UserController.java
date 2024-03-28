package EcommerceWebsiteJwtAuth.JwtAuthentication.controller;

import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.ForgotPasswordRequest;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.JwtRequest;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.OtpDto;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.UserDto;
import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.User;
import EcommerceWebsiteJwtAuth.JwtAuthentication.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
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
    public void forgotPassword(@RequestBody String emailOrUsername) throws MessagingException {
        userService.forgotPassword(emailOrUsername);
    }

    @PostMapping("/verify-otp")
    public Boolean VerifyOtp(@RequestBody OtpDto otp){
        return userService.verifyOtp(otp);
    }

}
