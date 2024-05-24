package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.entity.OwnerEntity;
import tech.getarrays.employeemanager1.entity.ProductEntity;

public interface OwnerService {
    public Page<OwnerEntity> listSearchAndPage(String any, Pageable pageable);

    public Page<OwnerEntity> findAllOwner(Pageable pageable);

    public OwnerEntity addOwner(OwnerEntity ownerEntity);

    public OwnerEntity updateOwner(OwnerEntity ownerEntity);

    public void deleteOwner(Integer id);

    public OwnerEntity findNameByCodeOwner(String code);
}
