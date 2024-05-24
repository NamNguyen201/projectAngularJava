package tech.getarrays.employeemanager1.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import tech.getarrays.employeemanager1.entity.LocationEntity;

import java.util.List;

public interface LocationService {
    public Page<LocationEntity> listSearchAndPage(String any, Pageable pageable);

    public Page<LocationEntity> findAllLocation(Pageable pageable);

    public LocationEntity addLocation(LocationEntity locationEntity);

    public LocationEntity updateLocation(LocationEntity locationEntity);

    public void deleteLocation(Integer id);

    public List<LocationEntity> findByWarehouse_Id (long warehouseId);

    public LocationEntity findLocation(Integer idLocation);
}
