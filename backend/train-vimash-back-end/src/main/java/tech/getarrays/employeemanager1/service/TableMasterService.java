package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.dto.TableMasterCheckDto;
import tech.getarrays.employeemanager1.entity.TableMasterEntity;

import java.util.Optional;


public interface TableMasterService {
    public Page<TableMasterEntity> getAllTableMaster(Pageable pageable);

    public void addTableMaster(TableMasterEntity tableMasterEntity);

    public Optional<TableMasterEntity> findIdTableMasterDto(Integer id);

    public TableMasterEntity findIdTableMaster(Integer id);

    public TableMasterEntity updateTaleMaster(TableMasterEntity tableMasterEntity);


    Optional<TableMasterEntity> findByCheckDto(TableMasterCheckDto tableMasterCheckDto);

    Page<TableMasterEntity> searchPageTableMaster(String any, Pageable pageable);
}
