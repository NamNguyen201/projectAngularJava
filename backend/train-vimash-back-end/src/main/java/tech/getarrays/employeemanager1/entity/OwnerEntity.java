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
@Table(name = "owner")
public class OwnerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Integer id;
    private String nameOwner;
    private String codeOwner;

    @OneToMany(mappedBy = "ownerEntity")
    @JsonBackReference
    private Set<TableMasterEntity> tableMasterEntity;

}
