package EcommerceWebsiteJwtAuth.JwtAuthentication.dao;

import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends JpaRepository<Role,String> {
    Role findByRoleName(String roleName);

}
