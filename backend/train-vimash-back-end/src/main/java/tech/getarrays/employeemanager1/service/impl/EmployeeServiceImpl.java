package tech.getarrays.employeemanager1.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.EmployeeEntity;
import tech.getarrays.employeemanager1.repository.EmployeeRepo;
import tech.getarrays.employeemanager1.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private  EmployeeRepo employeeRepo;
    public EmployeeEntity addEmployee(EmployeeEntity employeeEntity) {
        return employeeRepo.save(employeeEntity);
    }

    public Page<EmployeeEntity> findAllEmployees(Pageable pageable){
        return  employeeRepo.findAll(pageable);
    }

    public EmployeeEntity updateEmployee(EmployeeEntity employeeEntity){
        return employeeRepo.save(employeeEntity);
    }

    public void deleteEmployee(Long id){
        employeeRepo.deleteById(id);
    }
    @Override
    public Page<EmployeeEntity> listSearchAndPage(String any, Pageable pageable) {
        return employeeRepo.searchAndShowPage(any,pageable);

    }

}
