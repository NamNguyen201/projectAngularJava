package tech.getarrays.employeemanager1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.EmployeeEntity;
import tech.getarrays.employeemanager1.entity.ProductEntity;
import tech.getarrays.employeemanager1.repository.ProductRepo;
import tech.getarrays.employeemanager1.service.ProductService;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepo productRepo;

    public Page<ProductEntity> findAllProduct(Pageable pageable) {

        return  productRepo.findAll(pageable);
    }

    @Override
    public Page<ProductEntity> listSearchAndPage(String any, Pageable pageable) {
        return productRepo.searchAndShowPage(any,pageable);

    }


    @Override
    public ProductEntity addProduct(ProductEntity productEntity) {

        return productRepo.save(productEntity);
    }

    @Override
    public ProductEntity updateProduct(ProductEntity productEntity) {

        return productRepo.save(productEntity);
    }

    @Override
    public void deleteProduct(Integer id) {
        productRepo.deleteById(id);
    }

    @Override
    public ProductEntity findNameByCodeProduct(String code) {

        return productRepo.findNameProductByCodeProduct(code);
    }
}
