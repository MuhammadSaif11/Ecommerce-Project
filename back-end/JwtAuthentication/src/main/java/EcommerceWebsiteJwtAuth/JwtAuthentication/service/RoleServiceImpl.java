package EcommerceWebsiteJwtAuth.JwtAuthentication.service;


import EcommerceWebsiteJwtAuth.JwtAuthentication.dao.RoleDao;
import EcommerceWebsiteJwtAuth.JwtAuthentication.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    private RoleDao roleDao;

    @Autowired
    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    public Role saveRole(Role role){
        return roleDao.save(role);
    }

    @Override
    public Role findByRoleName(String roleName) {
        return roleDao.findByRoleName(roleName);
    }

}
