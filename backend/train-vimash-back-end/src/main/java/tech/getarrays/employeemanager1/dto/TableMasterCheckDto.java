package tech.getarrays.employeemanager1.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TableMasterCheckDto {
    private Integer idProduct;
    private Integer idOwner;
    private Integer idSupplier;
    private Integer idLocation;
    private Integer idInventoryStatus;
}
