package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.dto.CheckAdDTO;
import tech.getarrays.employeemanager1.dto.SaveDoubleDto;
import tech.getarrays.employeemanager1.dto.TableMasterCheckDto;
import tech.getarrays.employeemanager1.dto.TableMasterDTO;
import tech.getarrays.employeemanager1.entity.*;
import tech.getarrays.employeemanager1.repository.*;
import tech.getarrays.employeemanager1.service.InventoryStatusService;
import tech.getarrays.employeemanager1.service.ProductService;
import tech.getarrays.employeemanager1.service.impl.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/tableMaster")
public class TableMasterController {
    @Autowired
    private TableMasterServiceImpl tableMasterServiceImpl;

    @Autowired
    private ProductServiceImpl productService;

    @Autowired
    private OwnerServiceImpl ownerService;

    @Autowired
    private SupplierServiceImpl supplierService;

    @Autowired
    private LocationServiceImpl locationService;

    @Autowired
    private InventoryStatusImpl inventoryStatus;

    @Autowired
    private TableMasterRepo tableMasterRepo;

    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private OwnerRepo ownerRepo;
    @Autowired
    private SupplierRepo supplierRepo;
    @Autowired
    private LocationRepo locationRepo;
    @Autowired
    private InventoryStatusRepo inventoryStatusRepo;

    @Autowired
    private HistoryRepo historyRepo;
    @GetMapping("/all")
    public ResponseEntity<Page<TableMasterEntity>> getAllWareHouse (@PageableDefault(value = 12) Pageable pageable){
        Page <TableMasterEntity> tableMaster =  tableMasterServiceImpl.getAllTableMaster(pageable);
        return new ResponseEntity<>(tableMaster, HttpStatus.OK);
    }

    @PostMapping("/add")
    public  ResponseEntity<TableMasterEntity> addTableMaster(@RequestBody TableMasterDTO tableMasterDTO) {
        TableMasterEntity tableMasterEntity = new TableMasterEntity();
        BeanUtils.copyProperties(tableMasterDTO, tableMasterEntity);

        ProductEntity productEntity = productService.findNameByCodeProduct(tableMasterDTO.getCodeProduct());
        tableMasterEntity.setProductEntity(productEntity);

        OwnerEntity ownerEntity = ownerService.findNameByCodeOwner(tableMasterDTO.getCodeOwner());
        tableMasterEntity.setOwnerEntity(ownerEntity);

        SupplierEntity supplierEntity = supplierService.findNameByCodeSupplier(tableMasterDTO.getCodeSupplier());
        tableMasterEntity.setSupplierEntity(supplierEntity);

        LocationEntity locationEntity = locationService.findLocation(tableMasterDTO.getIdLocation());
        tableMasterEntity.setLocationEntity(locationEntity);

        InventoryStatusEntity inventoryStatusEntity = inventoryStatus.findInventoryStatus(tableMasterDTO.getIdInventoryStatus());
        tableMasterEntity.setInventoryStatusEntity(inventoryStatusEntity);
        tableMasterServiceImpl.addTableMaster(tableMasterEntity);
        return new ResponseEntity<>(tableMasterEntity, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TableMasterEntity> updateTableMaster(@PathVariable("id") Integer id, @RequestBody TableMasterDTO tableMasterDTO){
        Optional<TableMasterEntity> tableMasterOptional = tableMasterServiceImpl.findIdTableMasterDto(id);
        if(tableMasterOptional.isPresent()){
            TableMasterEntity tableMasterEntity = tableMasterOptional.get();
            BeanUtils.copyProperties(tableMasterDTO, tableMasterEntity);

            TableMasterEntity updateTableMasterEntity = tableMasterServiceImpl.updateTaleMaster(tableMasterEntity);
            //them moi vao bang history Chart
            HistoryEntity historyEntity= new HistoryEntity();
            historyEntity.setMasterId(tableMasterOptional.get().getId());
            historyEntity.setBeforeTotal(tableMasterDTO.getQuantity());
            LocalDateTime localDateTime = LocalDateTime.now();
            historyEntity.setLocalDateTime(localDateTime);

            historyRepo.save(historyEntity);
            return new ResponseEntity<>(updateTableMasterEntity, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TableMasterEntity>findIdTableMaster(@PathVariable("id") Integer idTableMaster){
        TableMasterEntity tableMaster = tableMasterServiceImpl.findIdTableMaster(idTableMaster);
        return new ResponseEntity<>(tableMaster, HttpStatus.OK);
    }

    @PostMapping("/findByCheckDto")
    public ResponseEntity<TableMasterEntity> findByCheckDto(@RequestBody TableMasterCheckDto tableMasterCheckDto) {

        Optional<TableMasterEntity> tableMasterOptional = tableMasterServiceImpl.findByCheckDto(tableMasterCheckDto);
        if (tableMasterOptional.isPresent()){
            TableMasterEntity tableMasterEntity = tableMasterOptional.get();
            return new ResponseEntity<>(tableMasterEntity, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
    }

    @PutMapping("/updateOrCreate")
    public ResponseEntity<TableMasterEntity> updateOrCreate(@RequestBody SaveDoubleDto saveDoubleDto){
        TableMasterEntity tableMasterEntity = new TableMasterEntity();
        //lấy idFormSetSeparate(nhận từ SaveDoubleDto, form bị chia) kiểm tra neu có thì cập nhật lại total theo idFormSetSeparate
        Optional<TableMasterEntity> tableMasterEntityCheck = tableMasterServiceImpl.findIdTableMasterDto(saveDoubleDto.getIdFormSetSeparate());
        if (tableMasterEntityCheck.isPresent()) {
            tableMasterEntity = tableMasterEntityCheck.get();
            tableMasterEntity.setQuantity(saveDoubleDto.getTotalTong());
            tableMasterServiceImpl.updateTaleMaster(tableMasterEntity);

            //them moi vao bang historyChart
            HistoryEntity historyEntity = new HistoryEntity();
            historyEntity.setMasterId(tableMasterEntityCheck.get().getId());
            historyEntity.setBeforeTotal(saveDoubleDto.getTotalTong());
            historyRepo.save(historyEntity);
        }

        TableMasterCheckDto tableMasterCheckDto = new TableMasterCheckDto();
        BeanUtils.copyProperties(saveDoubleDto, tableMasterCheckDto);

        TableMasterEntity tableMaster = new TableMasterEntity();

        Optional<TableMasterEntity> tableMasterOptional = tableMasterServiceImpl.findByCheckDto(tableMasterCheckDto);
        if (tableMasterOptional.isEmpty()){
            Optional<ProductEntity> productEntity = productRepo.findById(saveDoubleDto.getIdProduct());
            if(productEntity.isPresent()){
                tableMaster.setProductEntity(productEntity.get());
            }

            Optional<OwnerEntity> ownerEntity = ownerRepo.findById(saveDoubleDto.getIdOwner());
            if(ownerEntity.isPresent()){
                tableMaster.setOwnerEntity(ownerEntity.get());
            }

            Optional<SupplierEntity> supplierEntity = supplierRepo.findById(saveDoubleDto.getIdSupplier());
            if(supplierEntity.isPresent()){
                tableMaster.setSupplierEntity(supplierEntity.get());
            }


            Optional<LocationEntity> locationEntity = locationRepo.findById(saveDoubleDto.getIdLocation());
            if(locationEntity.isPresent()){
                tableMaster.setLocationEntity(locationEntity.get());
            }


            Optional<InventoryStatusEntity> inventoryStatusEntity = inventoryStatusRepo.findById(saveDoubleDto.getIdInventoryStatus());
            if(inventoryStatusEntity.isPresent()){
                tableMaster.setInventoryStatusEntity(inventoryStatusEntity.get());
            }

            tableMaster.setDate(saveDoubleDto.getDate());

            tableMaster.setShowRadioButton(saveDoubleDto.getShowRadioButton());

            tableMaster.setQuantity(saveDoubleDto.getQuantity());

            tableMaster.setNumber4(saveDoubleDto.getNumber4());

            tableMaster.setNumber5(saveDoubleDto.getNumber5());

            tableMaster.setNumber6(saveDoubleDto.getNumber6());

            tableMasterServiceImpl.addTableMaster(tableMaster);
            return new ResponseEntity<>(tableMaster, HttpStatus.OK);
        }else {

            tableMaster = tableMasterOptional.get();
            tableMaster.setNumber4(saveDoubleDto.getNumber4());
            tableMaster.setNumber5(saveDoubleDto.getNumber5());
            tableMaster.setNumber6(saveDoubleDto.getNumber6());
            tableMaster.setQuantity(saveDoubleDto.getQuantity());
            tableMaster.setShowRadioButton(saveDoubleDto.getShowRadioButton());
            //lấy giá trị thay đổi cho historyChart
            HistoryEntity historyEntity = new HistoryEntity();
            historyEntity.setMasterId(tableMasterOptional.get().getId());
            historyEntity.setBeforeTotal(saveDoubleDto.getQuantity());
            historyRepo.save(historyEntity);
            ////
            tableMasterServiceImpl.addTableMaster(tableMaster);
            return new ResponseEntity<>(tableMaster,HttpStatus.OK);
        }
    }

    @GetMapping("/findProductOwnerSupplierTableMaster")
    public ResponseEntity<Page<TableMasterEntity>> searchTableMaster(@PageableDefault (value = 12) Pageable pageable,
                                                                     @RequestParam(name = "any", required = false, defaultValue = "") String any){
        Page<TableMasterEntity> tableMasterSearch = tableMasterServiceImpl.searchPageTableMaster(any, pageable);
        return new ResponseEntity<>(tableMasterSearch, HttpStatus.OK);
    }

}
