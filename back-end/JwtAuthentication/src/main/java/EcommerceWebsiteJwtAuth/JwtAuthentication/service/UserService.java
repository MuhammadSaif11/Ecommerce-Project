package EcommerceWebsiteJwtAuth.JwtAuthentication.service;

import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.JwtRequest;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.UserDto;
import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;


public interface UserService{
    UserDto registerNewUser(UserDto user);

    List<User> getAllUsers();

    User findUserByName(String username);

}
