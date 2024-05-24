package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.InventoryStatusEntity;
import tech.getarrays.employeemanager1.entity.WarehouseEntity;
import tech.getarrays.employeemanager1.service.impl.WareHouseServiceImpl;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/wareHouse")
public class WareHouseController {
    @Autowired
    private WareHouseServiceImpl wareHouseServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<Page<WarehouseEntity>> getAllWareHouse (@PageableDefault(value = 12) Pageable pageable){
        Page <WarehouseEntity> wareHouse =  wareHouseServiceImpl.findAllWareHouse(pageable);
        return new ResponseEntity<>(wareHouse, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<Page<WarehouseEntity>>getSearchAngPage(@PageableDefault(value = 12) Pageable pageable,
                                                             @RequestParam(name="any",required = false, defaultValue = "")String any
    ){
        Page<WarehouseEntity> wareHouse = wareHouseServiceImpl.listSearchAndPage(any, pageable);
        return new ResponseEntity<>(wareHouse, HttpStatus.OK);
    }

    @GetMapping("/onlyList")
    public ResponseEntity<List<WarehouseEntity>> onlyListWarehouse(){
        List<WarehouseEntity> warehouse = wareHouseServiceImpl.findAll();
        return new ResponseEntity<>(warehouse, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<WarehouseEntity> addWareHouse(@RequestBody WarehouseEntity warehouseEntity){
        WarehouseEntity newWareHouseEntity = wareHouseServiceImpl.addWareHouse(warehouseEntity);
        return new ResponseEntity<>(newWareHouseEntity, HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<WarehouseEntity> updateWareHouse(@RequestBody WarehouseEntity warehouseEntity){
        WarehouseEntity updateWareHouseEntity = wareHouseServiceImpl.updateWareHouse(warehouseEntity);
        return new ResponseEntity<>(updateWareHouseEntity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteWareHouse(@PathVariable("id") Long id){
        wareHouseServiceImpl.deleteWareHouse(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
