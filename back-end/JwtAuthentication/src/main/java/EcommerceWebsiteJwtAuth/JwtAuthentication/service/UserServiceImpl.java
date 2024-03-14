package EcommerceWebsiteJwtAuth.JwtAuthentication.service;

import EcommerceWebsiteJwtAuth.JwtAuthentication.dao.UserDao;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.JwtRequest;
import EcommerceWebsiteJwtAuth.JwtAuthentication.dto.UserDto;
import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.Role;
import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.User;
import EcommerceWebsiteJwtAuth.JwtAuthentication.helper.JwtService;
import org.modelmapper.ModelMapper;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private UserDao userDao;

    private ModelMapper modelMapper;


    private RoleService roleService;
    private PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private AuthenticationManager authenticationManager;
    private JwtService jwtUtil;

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @Autowired
    @Lazy
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    @Autowired
    @Lazy
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    @Autowired
    @Lazy
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    @Autowired
    @Lazy
    public void setJwtUtil(JwtService jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserDto registerNewUser(UserDto user) {
        User user1 = this.modelMapper.map(user,User.class);
        user1.setPassword(passwordEncoder.encode(user.getPassword()));
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(roleService.findByRoleName("ROLE_USER"));
        user1.setRoles(roleSet);
        return this.modelMapper.map(userDao.save(user1),UserDto.class);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @Override
    public User findUserByName(String username) {
        return userDao.findByUsername(username);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("Entering in loadUserByUsername Method...");
        User user = userDao.findByUsername(username);
        if (user == null) {
            logger.error("Username not found: " + username);
            throw new UsernameNotFoundException("Invalid Username");
        }
//        logger.info("User Authenticated Successfully..!!!");
        return new UserInfoDetails(user);
    }
}
