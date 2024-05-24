package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.OwnerEntity;
import tech.getarrays.employeemanager1.entity.SupplierEntity;
import tech.getarrays.employeemanager1.service.impl.SupplierServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/supplier")
public class SupplierController {
    @Autowired
    private SupplierServiceImpl supplierServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<Page<SupplierEntity>> getAllSupplier (@PageableDefault(value = 12) Pageable pageable){
        Page <SupplierEntity> supplier =  supplierServiceImpl.findAllSupplier(pageable);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<Page<SupplierEntity>>getSearchAngPage(@PageableDefault(value = 12) Pageable pageable,
                                                             @RequestParam(name="any",required = false, defaultValue = "")String any
    ){
        Page<SupplierEntity> supplier = supplierServiceImpl.listSearchAndPage(any, pageable);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    @GetMapping("/findNameSupplier/{code}")
    public ResponseEntity<SupplierEntity>findNameByCodeSupplier(@PathVariable String code){
        SupplierEntity name = supplierServiceImpl.findNameByCodeSupplier(code);
        return new ResponseEntity<>(name,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SupplierEntity> addSupplier(@RequestBody SupplierEntity supplierEntity){
        SupplierEntity newSupplierEntity = supplierServiceImpl.addSupplier(supplierEntity);
        return new ResponseEntity<>(newSupplierEntity, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SupplierEntity> updateSupplier(@RequestBody SupplierEntity supplierEntity){
        SupplierEntity updateSupplierEntity = supplierServiceImpl.updateSupplier(supplierEntity);
        return new ResponseEntity<>(updateSupplierEntity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteSupplier(@PathVariable("id") Integer id){
        supplierServiceImpl.deleteSupplier(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

