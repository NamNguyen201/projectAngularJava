package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.ProductEntity;
import tech.getarrays.employeemanager1.service.impl.ProductServiceImpl;

import java.sql.ResultSet;

@CrossOrigin("*")
@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductServiceImpl productServiceImpl;

    @GetMapping("/all")
    public ResponseEntity<Page<ProductEntity>> getAllProduct (@PageableDefault (value = 12) Pageable pageable){
        Page <ProductEntity> product =  productServiceImpl.findAllProduct(pageable);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<Page<ProductEntity>>getSearchAngPage(@PageableDefault(value = 12) Pageable pageable,
                                                               @RequestParam(name="any",required = false, defaultValue = "")String any
    ){
        Page<ProductEntity> product = productServiceImpl.listSearchAndPage(any, pageable);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/findNameProduct/{code}")
    public ResponseEntity<ProductEntity>findNameByCodeProduct(@PathVariable String code){
        ProductEntity product = productServiceImpl.findNameByCodeProduct(code);
        return new ResponseEntity<>(product,HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ProductEntity> addProduct(@RequestBody ProductEntity productEntity){
        ProductEntity newProductEntity = productServiceImpl.addProduct(productEntity);
        return new ResponseEntity<>(newProductEntity, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ProductEntity> updateProduct(@RequestBody ProductEntity productEntity){
        ProductEntity updateProductEntity = productServiceImpl.updateProduct(productEntity);
        return new ResponseEntity<>(updateProductEntity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?>deleteProduct(@PathVariable("id") Integer id){
        productServiceImpl.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
