package tech.getarrays.employeemanager1.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.getarrays.employeemanager1.entity.LoginEntity;
import tech.getarrays.employeemanager1.repository.LoginUserRepo;
import tech.getarrays.employeemanager1.repository.TableMasterRepo;
import tech.getarrays.employeemanager1.service.LoginUserService;

import java.util.List;

@Service
public class LoginUserServiceImpl implements LoginUserService {

    @Autowired
    private LoginUserRepo loginUserRepo;

    @Override
    public LoginEntity findUserPassword(String userName, String passWord) {
        return loginUserRepo.findUserNameAndPassWord(userName, passWord);
    }
}
