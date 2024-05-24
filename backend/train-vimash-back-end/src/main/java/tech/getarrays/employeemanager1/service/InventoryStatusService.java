package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.entity.InventoryStatusEntity;
import tech.getarrays.employeemanager1.entity.LocationEntity;

import java.util.List;

public interface InventoryStatusService {
    public Page<InventoryStatusEntity> listSearchAndPage(String any, Pageable pageable);

    public Page<InventoryStatusEntity> findAllInventoryStatus(Pageable pageable);

    public InventoryStatusEntity addInventoryStatus(InventoryStatusEntity inventoryStatusEntity);

    public InventoryStatusEntity updateInventoryStatus(InventoryStatusEntity inventoryStatusEntity);

    public void deleteInventoryStatus(Integer id);

    public List<InventoryStatusEntity> findAll();

    public InventoryStatusEntity findInventoryStatus(Integer idInventory);

}
