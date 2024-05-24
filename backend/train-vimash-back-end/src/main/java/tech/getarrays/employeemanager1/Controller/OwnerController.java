package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.OwnerEntity;
import tech.getarrays.employeemanager1.service.impl.OwnerServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/owner")
public class OwnerController {
    @Autowired
    private OwnerServiceImpl ownerServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<Page<OwnerEntity>> getAllOwner (@PageableDefault(value = 12) Pageable pageable){
        Page <OwnerEntity> product =  ownerServiceImpl.findAllOwner(pageable);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<Page<OwnerEntity>>getSearchAngPage(@PageableDefault(value = 12) Pageable pageable,
                                                               @RequestParam(name="any",required = false, defaultValue = "")String any
    ){
        Page<OwnerEntity> owner = ownerServiceImpl.listSearchAndPage(any, pageable);
        return new ResponseEntity<>(owner, HttpStatus.OK);
    }

    @GetMapping("/findNameOwner/{code}")
    public ResponseEntity<OwnerEntity>findNameByCodeOwner(@PathVariable String code){
        OwnerEntity name = ownerServiceImpl.findNameByCodeOwner(code);
        return new ResponseEntity<>(name, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<OwnerEntity> addOwner(@RequestBody OwnerEntity ownerEntity){
        OwnerEntity newOwnerEntity = ownerServiceImpl.addOwner(ownerEntity);
        return new ResponseEntity<>(newOwnerEntity, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<OwnerEntity> updateOwner(@RequestBody OwnerEntity ownerEntity){
        OwnerEntity updateOwnerEntity = ownerServiceImpl.updateOwner(ownerEntity);
        return new ResponseEntity<>(updateOwnerEntity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteOwner(@PathVariable("id") Integer id){
        ownerServiceImpl.deleteOwner(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

