package com.app.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "cart")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Long cartId;
    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL)
    private Set<CartItem> cartItems = new LinkedHashSet<>();
    @OneToOne()
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;

    @Override
    public String toString() {
        return "Cart{" +
                "cartId=" + cartId +
                ", cartItems=" + cartItems +
                ", user=" + user +
                '}';
    }
}
