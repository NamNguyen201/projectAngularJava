package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.LocationEntity;
import tech.getarrays.employeemanager1.entity.ProductEntity;
import tech.getarrays.employeemanager1.entity.WarehouseEntity;

import java.util.List;

public interface LocationRepo extends JpaRepository<LocationEntity, Integer> {
    @Query("select e from LocationEntity e where e.nameLocation like %:any% ")
    Page<LocationEntity> searchAndShowPage(@Param("any") String any, Pageable pageable);

//    @Query("select l.id, l.nameLocation, w.id ,w.nameWarehouse " +
//            "from WarehouseEntity w " +
//            "join LocationEntity l on w.id = l.warehouseEntity.id " +
//            "where w.id IN (:warehouseId)")
//    List<Object[]> findIdLocationByIdWarehouse(@Param("warehouseId") long warehouseId);

    List<LocationEntity> findByWarehouseEntity_Id(long warehouseId);
}
