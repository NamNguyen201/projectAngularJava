package tech.getarrays.employeemanager1.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TableMasterDTO {

    private Date date;

    private Integer showRadioButton;

    private Integer quantity;

    private Integer number4;

    private Integer number5;

    private Integer number6;

    private String codeProduct;

    private String codeOwner;

    private String codeSupplier;

    private Integer idLocation;

    private Integer idInventoryStatus;



}
