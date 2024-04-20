package com.app.ecommerce.service;

import com.app.ecommerce.dao.OrderDao;
import com.app.ecommerce.dao.OrderItemDao;
import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dao.UserDao;
import com.app.ecommerce.dto.OrderDtoRequest;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.entity.Order;
import com.app.ecommerce.entity.OrderItem;
import com.app.ecommerce.entity.Product;
import com.app.ecommerce.entity.User;
import com.app.ecommerce.security.JwtAuthFilter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class OrderServiceImpl implements OrderService {

    private final String  ORDER_PLACED = "ORDER_PLACED";
    private OrderDao orderDao;
    private OrderItemDao orderItemDao;
    private ProductDao productDao;
    private UserDao userDao;
    private ModelMapper modelMapper;

    @Autowired
    public OrderServiceImpl(ModelMapper modelMapper,OrderDao orderDao, OrderItemDao orderItemDao, ProductDao productDao, UserDao userDao) {
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
        this.productDao = productDao;
        this.userDao = userDao;
        this.modelMapper = modelMapper;
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
        System.out.println(order);
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


        return SimpleMessageResponseDto.builder().message("Order has been places successfully").build();
    }
}
