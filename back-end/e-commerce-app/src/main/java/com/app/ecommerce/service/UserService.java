package com.app.ecommerce.service;

import com.app.ecommerce.dto.ChangePasswordDto;
import com.app.ecommerce.dto.OtpDto;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.dto.UserDto;
import com.app.ecommerce.entity.User;
import jakarta.mail.MessagingException;

import java.util.List;


public interface UserService{
    UserDto registerNewUser(UserDto user);

    List<User> getAllUsers();

    User findUserByName(String username);

    SimpleMessageResponseDto forgotPassword(String emailOrUsername) throws MessagingException;

    Boolean verifyOtp(OtpDto otp);

    SimpleMessageResponseDto changePassword(ChangePasswordDto newPassword);
}
