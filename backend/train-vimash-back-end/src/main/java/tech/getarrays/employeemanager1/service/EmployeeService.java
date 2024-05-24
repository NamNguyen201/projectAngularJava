package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.entity.EmployeeEntity;

public interface EmployeeService {
    public EmployeeEntity addEmployee(EmployeeEntity employeeEntity);
    public Page<EmployeeEntity> findAllEmployees(Pageable pageable);
    public EmployeeEntity updateEmployee(EmployeeEntity employeeEntity);
    public void deleteEmployee(Long id);
    public Page<EmployeeEntity> listSearchAndPage(String any, Pageable pageable);


}