package com.app.ecommerce.controller;
import com.app.ecommerce.dto.OrderDetailDto;
import com.app.ecommerce.dto.OrderDto;
import com.app.ecommerce.dto.OrderDtoRequest;
import com.app.ecommerce.dto.SimpleMessageResponseDto;
import com.app.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
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

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/details")
    public List<OrderDetailDto> getAllOrderDetails(@RequestParam(defaultValue = "all",required = false) String filter){
        return this.orderService.getAllOrdersDetails(filter);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/details/{orderId}")
    public void setOrderStatus(@PathVariable Long orderId){
        this.orderService.setOrderStatus(orderId);
    }
}
