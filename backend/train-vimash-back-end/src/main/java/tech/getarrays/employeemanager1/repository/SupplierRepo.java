package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.ProductEntity;
import tech.getarrays.employeemanager1.entity.SupplierEntity;

public interface SupplierRepo extends JpaRepository<SupplierEntity, Integer> {
    @Query("select e from SupplierEntity e where e.codeSupplier like %:any% or e.nameSupplier like %:any% ")
    Page<SupplierEntity> searchAndShowPage(@Param("any") String any, Pageable pageable);

    @Query("select e from SupplierEntity e where e.codeSupplier IN (:code)")
    SupplierEntity findNameSupplierByCodeSupplier(@Param("code")String code);
}
