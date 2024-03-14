package EcommerceWebsiteJwtAuth.JwtAuthentication.controller;

import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.JwtRequest;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.JwtResponse;
import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.User;
import EcommerceWebsiteJwtAuth.JwtAuthentication.helper.JwtService;
import EcommerceWebsiteJwtAuth.JwtAuthentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtController {
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    private UserService userService;
    @Autowired
    public JwtController(AuthenticationManager authenticationManager, JwtService jwtService,UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    @PostMapping("/login")
    public JwtResponse authenticateAndGetToken(@RequestBody JwtRequest jwtRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
        if(authentication.isAuthenticated()){
            User user = userService.findUserByName(jwtRequest.getUsername());
            return JwtResponse.builder()
                    .token(jwtService.GenerateToken(jwtRequest.getUsername()))
                    .firstname(user.getFirstName())
                    .lastname(user.getLastName())
                    .roles(user.getRoles())
                    .build();
        } else {
            throw new UsernameNotFoundException("invalid user request..!!");
        }
    }
}
