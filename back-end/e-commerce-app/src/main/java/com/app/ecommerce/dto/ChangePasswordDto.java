package com.app.ecommerce.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class ChangePasswordDto {
    private String newPassword;
    private String email;
}
