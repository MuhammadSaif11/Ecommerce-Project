package com.app.ecommerce.dto;


import com.app.ecommerce.validation.uniqueUsername.UniqueUsername;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    @NotBlank(message = "username can not be blank")
    @Size(min = 8,max = 16,message = "username should be in between 8 to 16 characters")
    @UniqueUsername
    private String username;
    @NotBlank(message = "firstname can not be blank")
    private String firstname;
    @NotBlank(message = "lastname can not be blank")
    private String lastname;
    @NotBlank(message = "password can not be blank")
    private String password;
    @NotBlank(message = "email can not be blank")
    @Email(message = "provide a valid email")
    private String email;
    @NotBlank(message = "gender can not be blank")
    private String gender;
}
