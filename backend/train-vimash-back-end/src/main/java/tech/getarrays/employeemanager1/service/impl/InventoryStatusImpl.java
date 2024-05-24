package tech.getarrays.employeemanager1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.InventoryStatusEntity;
import tech.getarrays.employeemanager1.repository.InventoryStatusRepo;
import tech.getarrays.employeemanager1.service.InventoryStatusService;

import java.util.List;

@Service
public class InventoryStatusImpl implements InventoryStatusService {
    @Autowired
    private InventoryStatusRepo inventoryStatusRepo;

    @Override
    public Page<InventoryStatusEntity> listSearchAndPage(String any, Pageable pageable) {
        return inventoryStatusRepo.searchAndShowPage(any, pageable);
    }

    @Override
    public Page<InventoryStatusEntity> findAllInventoryStatus(Pageable pageable) {
        return inventoryStatusRepo.findAll(pageable);
    }

    @Override
    public InventoryStatusEntity addInventoryStatus(InventoryStatusEntity inventoryStatusEntity) {
        return inventoryStatusRepo.save(inventoryStatusEntity);
    }

    @Override
    public InventoryStatusEntity updateInventoryStatus(InventoryStatusEntity inventoryStatusEntity) {
        return inventoryStatusRepo.save(inventoryStatusEntity);
    }

    @Override
    public void deleteInventoryStatus(Integer id) {
        inventoryStatusRepo.deleteById(id);
    }

    @Override
    public List<InventoryStatusEntity> findAll(){
        return inventoryStatusRepo.findAllInventoryStatus();
    }

    @Override
    public InventoryStatusEntity findInventoryStatus(Integer idInventory) {
        return inventoryStatusRepo.findById(idInventory).orElse(null);
    }
}


