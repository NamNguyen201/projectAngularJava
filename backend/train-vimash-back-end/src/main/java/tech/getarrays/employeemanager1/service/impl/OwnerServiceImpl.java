package tech.getarrays.employeemanager1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.OwnerEntity;
import tech.getarrays.employeemanager1.repository.OwnerRepo;
import tech.getarrays.employeemanager1.repository.ProductRepo;
import tech.getarrays.employeemanager1.service.OwnerService;
@Service
public class OwnerServiceImpl implements OwnerService {
    @Autowired
    private OwnerRepo ownerRepo;
    @Override
    public Page<OwnerEntity> listSearchAndPage(String any, Pageable pageable) {
        return ownerRepo.searchAndShowPage(any,pageable);
    }

    @Override
    public Page<OwnerEntity> findAllOwner(Pageable pageable) {

            return  ownerRepo.findAll(pageable);
    }

    @Override
    public OwnerEntity addOwner(OwnerEntity ownerEntity) {
        return ownerRepo.save(ownerEntity);
    }

    @Override
    public OwnerEntity updateOwner(OwnerEntity ownerEntity) {

        return ownerRepo.save(ownerEntity);
    }

    @Override
    public void deleteOwner(Integer id) {
        ownerRepo.deleteById(id);
    }

    @Override
    public OwnerEntity findNameByCodeOwner(String code) {
        return ownerRepo.findNameOwnerByCodeProduct(code);
    }
}
