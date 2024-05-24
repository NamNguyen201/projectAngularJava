package tech.getarrays.employeemanager1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.LocationEntity;
import tech.getarrays.employeemanager1.repository.LocationRepo;
import tech.getarrays.employeemanager1.service.LocationService;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private LocationRepo locationRepo;

    @Override
    public Page<LocationEntity> listSearchAndPage(String any, Pageable pageable) {
        return locationRepo.searchAndShowPage(any, pageable);
    }

    @Override
    public Page<LocationEntity> findAllLocation(Pageable pageable) {

        return locationRepo.findAll(pageable);
    }

    @Override
    public LocationEntity addLocation(LocationEntity locationEntity) {
        return locationRepo.save(locationEntity);
    }

    @Override
    public LocationEntity updateLocation(LocationEntity locationEntity) {

        return locationRepo.save(locationEntity);
    }

    @Override
    public void deleteLocation(Integer id) {
        locationRepo.deleteById(id);
    }

    @Override
    public List<LocationEntity> findByWarehouse_Id(long warehouseId) {
        return locationRepo.findByWarehouseEntity_Id(warehouseId);
    }

    @Override
    public LocationEntity findLocation(Integer idLocation) {
        return locationRepo.findById(idLocation).orElse(null);
    }


}
