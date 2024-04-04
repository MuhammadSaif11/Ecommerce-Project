package com.app.ecommerce.service;

import com.app.ecommerce.entity.Role;

public interface RoleService {

    Role saveRole(Role role);

    Role findByRoleName(String roleName);
}
