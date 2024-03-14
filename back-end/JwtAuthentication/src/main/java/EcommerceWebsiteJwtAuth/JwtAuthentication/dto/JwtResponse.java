package EcommerceWebsiteJwtAuth.JwtAuthentication.dto;

import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.Role;
import lombok.*;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class JwtResponse {
    private String token;
    private String firstname;
    private String lastname;
    private Set<Role> roles;
}
