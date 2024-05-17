package com.app.ecommerce.dto;

import lombok.*;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PageDto<T>{
    private List<T> content;
    private Long totalElements;
    private Integer totalPages;
    private Integer size;
    private Integer number;
}
