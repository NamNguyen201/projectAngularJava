package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestBody;
import tech.getarrays.employeemanager1.dto.TableMasterCheckDto;
import tech.getarrays.employeemanager1.entity.TableMasterEntity;

import java.util.List;
import java.util.Optional;

public interface TableMasterRepo extends JpaRepository<TableMasterEntity, Long> {
    @Query("select t from TableMasterEntity  t where "
            + "t.productEntity.id = :#{#tableCheckDto.idProduct} "
            + "and t.ownerEntity.id = :#{#tableCheckDto.idOwner} "
            + "and t.supplierEntity.id = :#{#tableCheckDto.idSupplier} "
            + "and t.locationEntity.id = :#{#tableCheckDto.idLocation} "
            + "and t.inventoryStatusEntity.id = :#{#tableCheckDto.idInventoryStatus}")
    Optional<TableMasterEntity> findByCheckDto(@Param("tableCheckDto") TableMasterCheckDto tableMasterCheckDto);

    @Query("select t from TableMasterEntity t join ProductEntity p on t.productEntity.id = p.id " +
            "join OwnerEntity o on t.ownerEntity.id = o.id " +
            "join SupplierEntity s on t.supplierEntity.id = s.id " +
            "where p.nameProduct like %:any% " +
            "or o.nameOwner like %:any% " +
            "or s.nameSupplier like %:any% " +
            "or p.codeProduct like %:any% " +
            "or o.codeOwner like %:any% " +
            "or s.codeSupplier like %:any%")
    Page<TableMasterEntity> searchProductOwnerSupplier(@Param("any") String any, Pageable pageable);

}
