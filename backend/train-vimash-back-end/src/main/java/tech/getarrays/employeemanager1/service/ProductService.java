package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.entity.EmployeeEntity;
import tech.getarrays.employeemanager1.entity.ProductEntity;

public interface ProductService {
    public Page<ProductEntity> listSearchAndPage(String any, Pageable pageable);

    public Page<ProductEntity> findAllProduct(Pageable pageable);

    public ProductEntity addProduct(ProductEntity productEntity);

    public ProductEntity updateProduct(ProductEntity productEntity);

    public void deleteProduct(Integer id);

    public  ProductEntity findNameByCodeProduct(String code);

}
