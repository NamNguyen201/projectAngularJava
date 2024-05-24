package tech.getarrays.employeemanager1.service;

import org.w3c.dom.stylesheets.LinkStyle;
import tech.getarrays.employeemanager1.entity.HistoryEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface HistoryService {

    List<HistoryEntity> getListHistory(Integer id, LocalDateTime localDateTimeNow, LocalDateTime localDateTimeBefore);
}
