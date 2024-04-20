package com.app.ecommerce.service;

import com.app.ecommerce.dto.OrderDtoRequest;
import com.app.ecommerce.dto.SimpleMessageResponseDto;

public interface OrderService {
    SimpleMessageResponseDto saveOrder(OrderDtoRequest orderDto);
}
