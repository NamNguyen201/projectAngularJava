package tech.getarrays.employeemanager1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tech.getarrays.employeemanager1.entity.LoginEntity;

import java.util.List;

public interface LoginUserRepo extends JpaRepository<LoginEntity, Integer> {

    @Query(" select l from LoginEntity l where l.userName = :userName and l.passWord = :passWord")
    LoginEntity findUserNameAndPassWord(@Param("userName") String userName,
                                              @Param("passWord") String passWord);
}
