package com.app.ecommerce.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "image_model")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="image_id")
    private Long imageId;
    @Column(name="image_type")
    private String type;
    @Column(name="image_name")
    private String name;
    @Column(name="image_pic_byte",length = 500000000)
    private byte[] picByte;
}
