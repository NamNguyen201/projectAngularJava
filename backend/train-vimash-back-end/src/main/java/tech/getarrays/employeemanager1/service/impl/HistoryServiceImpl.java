package tech.getarrays.employeemanager1.service.impl;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.HistoryEntity;
import tech.getarrays.employeemanager1.repository.HistoryRepo;
import tech.getarrays.employeemanager1.service.HistoryService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {
    @Autowired
    private HistoryRepo historyRepo;
    @Override
    public List<HistoryEntity> getListHistory(Integer id, LocalDateTime localDateTimeNow, LocalDateTime localDateTimeBefore) {
        return historyRepo.getHistoryEntitiesByIdMaster(id,localDateTimeNow, localDateTimeBefore);
    }
}
