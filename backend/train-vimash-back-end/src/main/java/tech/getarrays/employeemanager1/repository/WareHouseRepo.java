package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.WarehouseEntity;

import java.util.List;

public interface WareHouseRepo extends JpaRepository<WarehouseEntity, Long> {
    @Query("select e from WarehouseEntity e where e.nameWarehouse like %:any% ")
    Page<WarehouseEntity> searchAndShowPage(@Param("any") String any, Pageable pageable);

    @Query("select  e from WarehouseEntity e")
    List<WarehouseEntity> findAllWarehouse();
}
