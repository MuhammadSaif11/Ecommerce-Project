package com.app.ecommerce.service;

import com.app.ecommerce.dto.OrderDto;
import com.app.ecommerce.dto.OrderDtoRequest;
import com.app.ecommerce.dto.SimpleMessageResponseDto;

import java.util.List;

public interface OrderService {
    SimpleMessageResponseDto saveOrder(OrderDtoRequest orderDto);

    List<OrderDto> getAllOrders();
}
