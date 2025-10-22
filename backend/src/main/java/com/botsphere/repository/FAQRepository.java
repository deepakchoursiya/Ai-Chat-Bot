package com.botsphere.repository;

import com.botsphere.entity.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {
    List<FAQ> findByActiveTrue();
    List<FAQ> findByCategory(String category);
}