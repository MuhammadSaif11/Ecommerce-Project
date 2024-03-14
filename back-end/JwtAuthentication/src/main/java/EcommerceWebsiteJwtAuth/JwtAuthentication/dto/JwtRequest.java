package EcommerceWebsiteJwtAuth.JwtAuthentication.dto;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
public class JwtRequest {
    private String username;
    private String password;
}
