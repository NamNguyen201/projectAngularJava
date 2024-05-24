package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.ProductEntity;

import java.util.List;

public interface ProductRepo extends JpaRepository<ProductEntity, Integer> {
    @Query("select e from ProductEntity e where e.codeProduct like %:any% or e.nameProduct like %:any% ")
    Page<ProductEntity> searchAndShowPage(@Param("any") String any, Pageable pageable);

    @Query("select e from ProductEntity e where e.codeProduct = :code")
    ProductEntity findNameProductByCodeProduct(@Param("code")String code);
}
