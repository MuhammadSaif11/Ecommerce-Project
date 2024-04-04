package com.app.ecommerce.dao;

import com.app.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User,String> {

    User findByUsername(String username);


    @Query("SELECT u FROM User u WHERE u.email = :identifier OR u.username = :identifier")
    User findByEmailOrUsername(@Param("identifier") String identifier);
}
