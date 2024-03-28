package EcommerceWebsiteJwtAuth.JwtAuthentication.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OtpDto {
    private String email;
    private String code;
}