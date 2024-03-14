package EcommerceWebsiteJwtAuth.JwtAuthentication.validation.uniqueUsername;

import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.User;
import EcommerceWebsiteJwtAuth.JwtAuthentication.service.UserService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;

@Component
public class UniqueUsernameConstraintValidator implements ConstraintValidator<UniqueUsername,String> {

    private UserService userService;

    @Autowired
    public UniqueUsernameConstraintValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        User user = userService.findUserByName(s);
        if (user == null){
            return true;
        }
        return false;
    }
}
