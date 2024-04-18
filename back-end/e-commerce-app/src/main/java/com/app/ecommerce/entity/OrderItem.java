package com.app.ecommerce.entity;
import jakarta.persistence.*;
import lombok.*;

import javax.naming.Name;

@Entity
@Table(name = "order_item")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;
    @ManyToOne
    private Product product;
    @Column(name = "quantity")
    private Integer quantity;
    @ManyToOne
    private Order order;
}
