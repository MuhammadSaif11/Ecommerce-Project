package com.app.ecommerce.validation.uniqueUsername;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueUsernameConstraintValidator.class)
@Target({ElementType.FIELD,ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {
    public String message() default "username already taken";

    public Class<?>[] groups() default {};

    public Class<? extends Payload>[] payload() default {};
}
