package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.HistoryEntity;
import tech.getarrays.employeemanager1.service.impl.HistoryServiceImpl;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/history")
public class HistoryController {

    @Autowired
    private HistoryServiceImpl historyService;

    @GetMapping("/all")
    public ResponseEntity<List<HistoryEntity>> getAllProduct (@RequestParam(name = "id", defaultValue = "", required = false) Integer id,
                                                              @RequestParam(name = "localDateTimeNow", defaultValue = "", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime localDateTimeNow,
                                                              @RequestParam(name = "localDateTimeBefore", defaultValue = "", required = false) LocalDateTime localDateTimeBefore){
        List <HistoryEntity> historyEntities = historyService.getListHistory(id, localDateTimeNow, localDateTimeBefore);
        return new ResponseEntity<>(historyEntities, HttpStatus.OK);
    }
}
