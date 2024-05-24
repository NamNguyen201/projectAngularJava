package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.OwnerEntity;
import tech.getarrays.employeemanager1.entity.ProductEntity;

public interface OwnerRepo extends JpaRepository<OwnerEntity, Integer> {
    @Query("select e from OwnerEntity e where e.codeOwner like %:any% or e.nameOwner like %:any% ")
    Page<OwnerEntity> searchAndShowPage(@Param("any") String any, Pageable pageable);

    @Query("select e from OwnerEntity e where e.codeOwner IN (:code)")
    OwnerEntity findNameOwnerByCodeProduct(@Param("code")String code);
}
