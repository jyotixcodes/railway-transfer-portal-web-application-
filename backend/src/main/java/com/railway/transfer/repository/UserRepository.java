package com.railway.transfer.repository;

import com.railway.transfer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmployeeId(String employeeId);
    boolean existsByEmail(String email);
    boolean existsByEmployeeId(String employeeId);
    boolean existsByPfNumber(String pfNumber);
    List<User> findByVerified(boolean verified);  
}