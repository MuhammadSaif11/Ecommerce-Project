package EcommerceWebsiteJwtAuth.JwtAuthentication.dao;

import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OtpDao extends JpaRepository<Otp,Long>{

    Otp findByEmail(String email);
    List<Otp> findByExpirationTimeBefore(LocalDateTime expirationTime);

}
