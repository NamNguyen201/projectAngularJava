package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.InventoryStatusEntity;
import tech.getarrays.employeemanager1.entity.OwnerEntity;
import tech.getarrays.employeemanager1.service.impl.InventoryStatusImpl;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/inventoryStatus")
public class InventoryStatusController {
    @Autowired
    private InventoryStatusImpl inventoryStatusServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<Page<InventoryStatusEntity>> getAllInventoryStatus (@PageableDefault(value = 12) Pageable pageable){
        Page <InventoryStatusEntity> inventoryStatus =  inventoryStatusServiceImpl.findAllInventoryStatus(pageable);
        return new ResponseEntity<>(inventoryStatus, HttpStatus.OK);
    }

    @GetMapping("/onlyList")
    public ResponseEntity<List<InventoryStatusEntity>> onlyListInventoryStatus(){
        List<InventoryStatusEntity> inventoryStatus = inventoryStatusServiceImpl.findAll();
        return new ResponseEntity<>(inventoryStatus, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<Page<InventoryStatusEntity>>getSearchAngPage(@PageableDefault(value = 12) Pageable pageable,
                                                             @RequestParam(name="any",required = false, defaultValue = "")String any
    ){
        Page<InventoryStatusEntity> inventoryStatus = inventoryStatusServiceImpl.listSearchAndPage(any, pageable);
        return new ResponseEntity<>(inventoryStatus, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<InventoryStatusEntity> addInventoryStatus(@RequestBody InventoryStatusEntity inventoryStatusEntity){
        InventoryStatusEntity newInventoryStatusEntity = inventoryStatusServiceImpl.addInventoryStatus(inventoryStatusEntity);
        return new ResponseEntity<>(newInventoryStatusEntity, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<InventoryStatusEntity> updateInventoryStatus(@RequestBody InventoryStatusEntity inventoryStatusEntity){
        InventoryStatusEntity updateInventoryStatusEntity = inventoryStatusServiceImpl.updateInventoryStatus(inventoryStatusEntity);
        return new ResponseEntity<>(updateInventoryStatusEntity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteInventoryStatus(@PathVariable("id") Integer id){
        inventoryStatusServiceImpl.deleteInventoryStatus(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
