package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.entity.WarehouseEntity;

import java.util.List;

public interface WareHouseService {
    public Page<WarehouseEntity> listSearchAndPage(String any, Pageable pageable);

    public Page<WarehouseEntity> findAllWareHouse(Pageable pageable);

    public WarehouseEntity addWareHouse(WarehouseEntity warehouseEntity);

    public WarehouseEntity updateWareHouse(WarehouseEntity warehouseEntity);

    public void deleteWareHouse(Long id);

    public List<WarehouseEntity> findAll();
}
