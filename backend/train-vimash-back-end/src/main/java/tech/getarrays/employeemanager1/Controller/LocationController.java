package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.LocationEntity;
import tech.getarrays.employeemanager1.entity.WarehouseEntity;
import tech.getarrays.employeemanager1.service.impl.LocationServiceImpl;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/location")
public class LocationController {
    @Autowired
    private LocationServiceImpl locationServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<Page<LocationEntity>> getAllLocation (@PageableDefault(value = 12) Pageable pageable){
        Page <LocationEntity> location =  locationServiceImpl.findAllLocation(pageable);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<Page<LocationEntity>>getSearchAngPage(@PageableDefault(value = 12) Pageable pageable,
                                                                 @RequestParam(name="any",required = false, defaultValue = "")String any
    ){
        Page<LocationEntity> location = locationServiceImpl.listSearchAndPage(any, pageable);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<LocationEntity> addLocation(@RequestBody LocationEntity locationEntity){
        LocationEntity newLocationEntity = locationServiceImpl.addLocation(locationEntity);
        return new ResponseEntity<>(newLocationEntity, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<LocationEntity> updateLocation(@RequestBody LocationEntity locationEntity){
        LocationEntity updateLocationEntity = locationServiceImpl.updateLocation(locationEntity);
        return new ResponseEntity<>(updateLocationEntity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteLocation(@PathVariable("id") Integer id){
        locationServiceImpl.deleteLocation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findWarehouseId")
    public  ResponseEntity<List<LocationEntity>>findWarehouse_id(@RequestParam long warehouseId){
        List<LocationEntity> location = locationServiceImpl.findByWarehouse_Id(warehouseId);
        return new ResponseEntity<>(location,HttpStatus.OK);
    }
}

