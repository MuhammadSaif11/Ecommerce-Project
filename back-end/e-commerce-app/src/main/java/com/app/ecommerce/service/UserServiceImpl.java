package com.app.ecommerce.service;

import com.app.ecommerce.dao.CartDao;
import com.app.ecommerce.dao.OtpDao;
import com.app.ecommerce.dao.UserDao;
import com.app.ecommerce.dto.ChangePasswordDto;
import com.app.ecommerce.dto.OtpDto;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.dto.UserDto;
import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.Otp;
import com.app.ecommerce.entity.Role;
import com.app.ecommerce.entity.User;
import com.app.ecommerce.exception.UserNotFoundException;
import com.app.ecommerce.helper.JwtService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.modelmapper.ModelMapper;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {
    private UserDao userDao;
    private OtpDao otpDao;
    private ModelMapper modelMapper;
    private RoleService roleService;
    private PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private AuthenticationManager authenticationManager;
    private JwtService jwtUtil;
    private CartDao cartDao;

    @Autowired
    @Lazy
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    public void setCartService(CartDao cartDao) {
        this.cartDao = cartDao;
    }
    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @Autowired
    public void setOtpDao(OtpDao otpDao) {
        this.otpDao = otpDao;
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
        User user2 = userDao.save(user1);
        Cart cart = Cart
                .builder()
                .user(user2)
                .cartItems(new LinkedHashSet<>())
                .build();
        this.cartDao.save(cart);
        UserDto userDto = this.modelMapper.map(user2,UserDto.class);
        return userDto;
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
    public SimpleMessageResponseDto forgotPassword(String emailOrUsername) throws MessagingException {
        User user = userDao.findByEmailOrUsername(emailOrUsername);
        if (user == null){
            throw new UserNotFoundException("user not find with this email or username");
        }
        else {
            Random random = new Random();
            Integer code = random.nextInt(900000) + 100000;
            Otp existedOtp = otpDao.findByEmail(user.getEmail());
            if (existedOtp != null){
                existedOtp.setOtp(String.valueOf(code));
                existedOtp.setCreatedAt(LocalDateTime.now());
                existedOtp.setExpirationTime(LocalDateTime.now().plusMinutes(5));
                otpDao.save(existedOtp);
            }
            else{
                Otp otp = Otp.builder()
                        .otp(String.valueOf(code))
                        .email(user.getEmail())
                        .expirationTime(LocalDateTime.now().plusMinutes(5))
                        .createdAt(LocalDateTime.now())
                        .build();
                this.otpDao.save(otp);
            }
            MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(user.getEmail());
            mimeMessageHelper.setSubject("Otp Verification");
            mimeMessageHelper.setText(String.valueOf(code));
            this.javaMailSender.send(mimeMessage);
        }
        return new SimpleMessageResponseDto("Otp sent successfully");
    }

    @Override
    public Boolean verifyOtp(OtpDto otp) {
        Otp otp1 = otpDao.findByEmail(otp.getEmail());
        String code = otp1.getOtp();
        if (code.equals(otp.getCode()) && otp1.getExpirationTime().isAfter(LocalDateTime.now())){
            otpDao.delete(otp1);
            return true;
        }
        return false;
    }

    @Override
    public SimpleMessageResponseDto changePassword(ChangePasswordDto changePasswordDto) {
        User user = userDao.findByEmailOrUsername(changePasswordDto.getEmail());
        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        userDao.save(user);
        return new SimpleMessageResponseDto("Password changed successfully");
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

//    @Scheduled(fixedRate = 300000)
//    public void cleanupExpiredOtp(){
//        List<Otp> otp = otpDao.findByExpirationTimeBefore(LocalDateTime.now());
//        otp.stream().forEach(ot -> System.out.println(ot.getEmail() + " "+LocalDateTime.now()));
//        if (otp!=null){
//            otpDao.deleteAll(otp);
//        }
//    }
}
