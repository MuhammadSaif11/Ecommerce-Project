package com.app.ecommerce.service;

import com.app.ecommerce.dao.*;
import com.app.ecommerce.dto.OrderDto;
import com.app.ecommerce.dto.OrderDtoRequest;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.entity.*;
import com.app.ecommerce.security.JwtAuthFilter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class OrderServiceImpl implements OrderService {

    private final String  ORDER_PLACED = "ORDER_PLACED";
    private OrderDao orderDao;
    private OrderItemDao orderItemDao;
    private ProductDao productDao;
    private UserDao userDao;
    private CartDao cartDao;
    private CartItemDao cartItemDao;
    private ModelMapper modelMapper;

    @Autowired
    public OrderServiceImpl(CartItemDao cartItemDao,CartDao cartDao,ModelMapper modelMapper,OrderDao orderDao, OrderItemDao orderItemDao, ProductDao productDao, UserDao userDao) {
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
        this.productDao = productDao;
        this.userDao = userDao;
        this.modelMapper = modelMapper;
        this.cartDao = cartDao;
        this.cartItemDao = cartItemDao;
    }

    @Override
    public SimpleMessageResponseDto saveOrder(OrderDtoRequest orderDto) {
        User user = userDao.findByUsername(JwtAuthFilter.CURRENT_USER);
        AtomicReference<Double> orderTotalAmount = new AtomicReference<>(0.0);
        orderDto.getOrderItem().stream().forEach(orderItemDto -> {
            orderTotalAmount.updateAndGet(v ->
                    v + (productDao.findProductDiscountedPriceByProductId(orderItemDto.getProductId()) * orderItemDto.getQuantity()));
        });
        Order order = Order
                .builder()
                .user(user)
                .orderStatus(ORDER_PLACED)
                .fullName(orderDto.getFullName())
                .contactNumber(orderDto.getContactNumber())
                .fullAddress(orderDto.getFullAddress())
                .createdAt(LocalDateTime.now())
                .orderTotalAmount(orderTotalAmount.get())
                .build();
        Order savedOrder = orderDao.save(order);

        orderDto.getOrderItem().stream().forEach(orderItemDto -> {
            Product product = productDao.findById(orderItemDto.getProductId()).get();
            OrderItem orderItem = OrderItem
                    .builder()
                    .product(product)
                    .quantity(orderItemDto.getQuantity())
                    .order(order)
                    .build();
            this.orderItemDao.save(orderItem);
        });

        Cart cart1 = this.cartDao.findByUser(user);
        this.cartItemDao.deleteByCart_CartId(cart1.getCartId());

        return SimpleMessageResponseDto.builder().message("Order has been places successfully").build();
    }

    @Override
    public List<OrderDto> getAllOrders() {
//        User user = this.userDao.findByUsername(JwtAuthFilter.CURRENT_USER);
        List<OrderDto> ordersList = new ArrayList<>();
        List<Order> orders = this.orderDao.findByUser_Username(JwtAuthFilter.CURRENT_USER);
        orders.stream().forEach(order -> {
            OrderDto orderDto = this.modelMapper.map(order,OrderDto.class);
            ordersList.add(orderDto);
        });
        return ordersList;
    }
}
