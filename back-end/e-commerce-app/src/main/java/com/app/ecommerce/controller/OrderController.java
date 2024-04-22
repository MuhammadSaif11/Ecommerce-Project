package com.app.ecommerce.controller;
import com.app.ecommerce.dto.OrderDto;
import com.app.ecommerce.dto.OrderDtoRequest;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @PostMapping("")
    public SimpleMessageResponseDto saveOrder(@RequestBody OrderDtoRequest orderDtoRequest){
        return this.orderService.saveOrder(orderDtoRequest);
    }

    @PreAuthorize("hasAuthority('ROLE_USER')")
    @GetMapping("")
    public List<OrderDto> getAllOrders(){
        return this.orderService.getAllOrders();
    }
}