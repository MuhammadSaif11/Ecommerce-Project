package EcommerceWebsiteJwtAuth.JwtAuthentication.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomError {
    private Long timestamp;
    private Integer status;
    private String message;
}
