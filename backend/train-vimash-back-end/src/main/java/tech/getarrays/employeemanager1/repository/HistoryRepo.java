package tech.getarrays.employeemanager1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.HistoryEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface HistoryRepo extends JpaRepository<HistoryEntity, Integer> {
    @Query("select h from  HistoryEntity h where h.masterId =:id and h.localDateTime <=:localDateTimeNow and h.localDateTime >=:localDateTimeBefore")
    List<HistoryEntity> getHistoryEntitiesByIdMaster(@Param("id") Integer id,
                                                     @Param("localDateTimeNow") LocalDateTime localDateTimeNow,
                                                     @Param("localDateTimeBefore")LocalDateTime localDateTimeBefore);

}
