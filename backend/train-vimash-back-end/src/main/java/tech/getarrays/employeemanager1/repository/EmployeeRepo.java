package tech.getarrays.employeemanager1.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tech.getarrays.employeemanager1.entity.EmployeeEntity;

@Repository
public interface EmployeeRepo extends JpaRepository<EmployeeEntity, Long> {
    @Query("select e from EmployeeEntity e where e.code like %:any% or e.name like %:any% ")
    Page<EmployeeEntity> searchAndShowPage(@Param("any") String any, Pageable pageable);
}
