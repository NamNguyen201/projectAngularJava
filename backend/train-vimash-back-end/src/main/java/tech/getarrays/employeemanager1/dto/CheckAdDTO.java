package tech.getarrays.employeemanager1.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class CheckAdDTO {
    private Date date;

    private Integer showRadioButton;

    private Integer quantity;

    private Integer number4;

    private Integer number5;

    private Integer number6;

    private Integer idProduct;
    private Integer idOwner;
    private Integer idSupplier;
    private Integer idLocation;
    private Integer idInventoryStatus;

}
