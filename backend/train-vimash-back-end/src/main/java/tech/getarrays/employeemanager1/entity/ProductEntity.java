package tech.getarrays.employeemanager1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;
    private String nameProduct;
    private String codeProduct;
    private String note;



    @OneToMany(mappedBy = "productEntity")
    @JsonBackReference
    private Set<TableMasterEntity> tableMasterEntity;
}
