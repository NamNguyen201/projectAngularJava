package tech.getarrays.employeemanager1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.WarehouseEntity;
import tech.getarrays.employeemanager1.repository.WareHouseRepo;
import tech.getarrays.employeemanager1.service.WareHouseService;

import java.util.List;

@Service
public class WareHouseServiceImpl implements WareHouseService {
    @Autowired
    private WareHouseRepo wareHouseRepo;

    @Override
    public Page<WarehouseEntity> listSearchAndPage(String any, Pageable pageable) {
        return wareHouseRepo.searchAndShowPage(any, pageable);
    }

    @Override
    public Page<WarehouseEntity> findAllWareHouse(Pageable pageable) {
        return wareHouseRepo.findAll(pageable);
    }

    @Override
    public WarehouseEntity addWareHouse(WarehouseEntity warehouseEntity) {
        return wareHouseRepo.save(warehouseEntity);
    }

    @Override
    public WarehouseEntity updateWareHouse(WarehouseEntity warehouseEntity) {
        return wareHouseRepo.save(warehouseEntity);
    }

    @Override
    public void deleteWareHouse(Long id) {
        wareHouseRepo.deleteById(id);
    }

    @Override
    public List<WarehouseEntity> findAll() {
        return wareHouseRepo.findAllWarehouse();
    }
}
