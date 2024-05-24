package tech.getarrays.employeemanager1.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import tech.getarrays.employeemanager1.dto.TableMasterCheckDto;
import tech.getarrays.employeemanager1.entity.TableMasterEntity;
import tech.getarrays.employeemanager1.repository.TableMasterRepo;
import tech.getarrays.employeemanager1.service.TableMasterService;

import java.util.Optional;


@Service
public class TableMasterServiceImpl implements TableMasterService{
    @Autowired
    private TableMasterRepo tableMasterRepo;
    @Override
    public Page<TableMasterEntity> getAllTableMaster(Pageable pageable) {
        return tableMasterRepo.findAll(pageable);
    }

    @Override
    public void addTableMaster(TableMasterEntity tableMasterEntity) {
        tableMasterRepo.save(tableMasterEntity);
    }

    @Override
    public Optional<TableMasterEntity> findIdTableMasterDto(Integer id) {
        return tableMasterRepo.findById(Long.valueOf(id));
    }

    @Override
    public TableMasterEntity findIdTableMaster(Integer id) {
        return tableMasterRepo.findById(Long.valueOf(id)).orElse(null);
    }


    @Override
    public TableMasterEntity updateTaleMaster(TableMasterEntity tableMasterEntity) {
        return tableMasterRepo.save(tableMasterEntity);
    }

    @Override
    public Optional<TableMasterEntity> findByCheckDto(TableMasterCheckDto tableMasterCheckDto) {
        return tableMasterRepo.findByCheckDto(tableMasterCheckDto);
    }

    @Override
    public Page<TableMasterEntity> searchPageTableMaster(String any,Pageable pageable) {
        return tableMasterRepo.searchProductOwnerSupplier(any, pageable);
    }


}

