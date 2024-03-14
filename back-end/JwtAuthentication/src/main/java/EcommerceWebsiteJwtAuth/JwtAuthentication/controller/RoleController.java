package EcommerceWebsiteJwtAuth.JwtAuthentication.controller;

import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.Role;
import EcommerceWebsiteJwtAuth.JwtAuthentication.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
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
