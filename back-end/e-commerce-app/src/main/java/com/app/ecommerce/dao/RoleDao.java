package com.app.ecommerce.dao;

import com.app.ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends JpaRepository<Role,String> {
    Role findByRoleName(String roleName);

}
