package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.EmployeeEntity;
import tech.getarrays.employeemanager1.service.impl.EmployeeServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeServiceImpl employeeServiceImpl;

    @GetMapping("/find")
    public ResponseEntity<Page<EmployeeEntity>> getSearchAndPage(@PageableDefault (value = 12) Pageable pageable,
                                                                 @RequestParam(name = "any", required = false, defaultValue = "")String any
    ) {
        Page<EmployeeEntity> employee = employeeServiceImpl.listSearchAndPage(any,pageable);
        return new ResponseEntity<>(employee, HttpStatus.OK);

    }
    @GetMapping("/all")
    public ResponseEntity<Page<EmployeeEntity>> getAllEmployees (@PageableDefault (value = 12) Pageable pageable){
        Page <EmployeeEntity> employees =  employeeServiceImpl.findAllEmployees(pageable);
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<EmployeeEntity> addEmployee(@RequestBody EmployeeEntity employeeEntity){
        EmployeeEntity newEmployeeEntity = employeeServiceImpl.addEmployee(employeeEntity);
        return new ResponseEntity<>(newEmployeeEntity, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<EmployeeEntity> updateEmployee(@RequestBody EmployeeEntity employeeEntity){
        EmployeeEntity updateEmployeeEntity = employeeServiceImpl.updateEmployee(employeeEntity);
        return new ResponseEntity<>(updateEmployeeEntity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id){
        employeeServiceImpl.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
