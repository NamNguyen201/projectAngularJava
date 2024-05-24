package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.InventoryStatusEntity;
import tech.getarrays.employeemanager1.entity.LocationEntity;

import java.util.List;

public interface InventoryStatusRepo extends JpaRepository<InventoryStatusEntity, Integer> {
    @Query("select e from InventoryStatusEntity e where e.status like %:any% ")
    Page<InventoryStatusEntity> searchAndShowPage(@Param("any") String any, Pageable pageable);

    @Query("select  e from InventoryStatusEntity e")
    List<InventoryStatusEntity> findAllInventoryStatus();
}
