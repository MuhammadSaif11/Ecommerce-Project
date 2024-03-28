package EcommerceWebsiteJwtAuth.JwtAuthentication.service;

import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.OtpDto;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.UserDto;
import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.User;
import jakarta.mail.MessagingException;

import java.util.List;


public interface UserService{
    UserDto registerNewUser(UserDto user);

    List<User> getAllUsers();

    User findUserByName(String username);

    void forgotPassword(String emailOrUsername) throws MessagingException;

    Boolean verifyOtp(OtpDto otp);
}
