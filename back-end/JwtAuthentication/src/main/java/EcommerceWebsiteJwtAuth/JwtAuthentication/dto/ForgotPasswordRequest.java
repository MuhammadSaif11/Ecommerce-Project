package EcommerceWebsiteJwtAuth.JwtAuthentication.dto;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class ForgotPasswordRequest {
    private String usernameOrEmail;
    private String code;
}
