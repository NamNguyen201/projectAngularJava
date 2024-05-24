package tech.getarrays.employeemanager1.service;

import tech.getarrays.employeemanager1.entity.LoginEntity;

import java.util.List;

public interface LoginUserService {
    LoginEntity findUserPassword(String userName, String passWord);
}
