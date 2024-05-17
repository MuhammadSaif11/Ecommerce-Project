package com.app.ecommerce.controller;

import com.app.ecommerce.entity.Role;
import com.app.ecommerce.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleController {

    private RoleService roleService;

    @Autowired
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/role")
    public Role saveRole(@RequestBody Role role){
        return roleService.saveRole(role);
    }
}
