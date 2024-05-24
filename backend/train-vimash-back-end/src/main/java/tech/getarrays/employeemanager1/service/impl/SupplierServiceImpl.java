package tech.getarrays.employeemanager1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.SupplierEntity;
import tech.getarrays.employeemanager1.repository.SupplierRepo;
import tech.getarrays.employeemanager1.service.SupplierService;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    private SupplierRepo supplierRepo;

    @Override
    public Page<SupplierEntity> listSearchAndPage(String any, Pageable pageable) {
        return supplierRepo.searchAndShowPage(any,pageable);
    }

    @Override
    public Page<SupplierEntity> findAllSupplier(Pageable pageable) {

        return  supplierRepo.findAll(pageable);
    }

    @Override
    public SupplierEntity addSupplier(SupplierEntity supplierEntity) {

        return supplierRepo.save(supplierEntity);
    }

    @Override
    public SupplierEntity updateSupplier(SupplierEntity supplierEntity) {

        return supplierRepo.save(supplierEntity);
    }

    @Override
    public void deleteSupplier(Integer id) {
        supplierRepo.deleteById(id);
    }

    @Override
    public SupplierEntity findNameByCodeSupplier(String code) {
        return supplierRepo.findNameSupplierByCodeSupplier(code);
    }
}
