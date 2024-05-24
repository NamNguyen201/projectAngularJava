package tech.getarrays.employeemanager1.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name ="tableMasterEntity")
public class TableMasterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date date;
    private Integer showRadioButton;
    private Integer quantity;
    private Integer number4;
    private Integer number5;
    private Integer number6;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private ProductEntity productEntity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id",referencedColumnName = "id")
    private OwnerEntity ownerEntity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "supplier_id",referencedColumnName = "id")
    private SupplierEntity supplierEntity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id",referencedColumnName = "id")
    private LocationEntity locationEntity;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "inventoryStatus_id",referencedColumnName = "id")
    private  InventoryStatusEntity inventoryStatusEntity;


}
