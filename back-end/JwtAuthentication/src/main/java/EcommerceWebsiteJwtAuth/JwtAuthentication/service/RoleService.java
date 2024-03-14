package EcommerceWebsiteJwtAuth.JwtAuthentication.service;

import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.Role;

public interface RoleService {

    Role saveRole(Role role);

    Role findByRoleName(String roleName);
}
