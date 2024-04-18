package com.app.ecommerce.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "order")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ToString
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;
    @Column(name = "order_status")
    private String orderStatus;
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();
    @Column(name = "order_total_amount")
    private Double orderTotalAmount;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
