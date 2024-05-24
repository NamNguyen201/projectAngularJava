package tech.getarrays.employeemanager1.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.getarrays.employeemanager1.entity.LoginEntity;
import tech.getarrays.employeemanager1.service.impl.LoginUserServiceImpl;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private LoginUserServiceImpl loginUserService;

    @PostMapping("")
    ResponseEntity<?>login(@RequestBody LoginEntity loginEntity){
        String userName = loginEntity.getUserName();
        String passWord = loginEntity.getPassWord();

        LoginEntity valueLoginEntity = loginUserService.findUserPassword(userName, passWord);
        if(valueLoginEntity != null){
            return ResponseEntity.ok(valueLoginEntity);
        }else{
            String errorMessage = "Nhap sai ";
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorMessage);
        }
    }
}