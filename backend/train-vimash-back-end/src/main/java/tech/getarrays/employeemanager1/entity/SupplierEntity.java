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
@Table(name = "supplier")
public class SupplierEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;
    private String nameSupplier;
    private String codeSupplier;

    @OneToMany(mappedBy = "supplierEntity")
    @JsonBackReference
    private Set<TableMasterEntity> tableMasterEntity;
}
