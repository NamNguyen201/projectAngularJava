package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.entity.ProductEntity;
import tech.getarrays.employeemanager1.entity.SupplierEntity;

public interface SupplierService {
    public Page<SupplierEntity> listSearchAndPage(String any, Pageable pageable);

    public Page<SupplierEntity> findAllSupplier(Pageable pageable);

    public SupplierEntity addSupplier(SupplierEntity supplierEntity);

    public SupplierEntity updateSupplier(SupplierEntity supplierEntity);

    public void deleteSupplier(Integer id);

    public SupplierEntity findNameByCodeSupplier(String code);
}
