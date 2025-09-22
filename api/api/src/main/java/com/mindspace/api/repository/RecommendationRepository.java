package com.mindspace.api.repository;

import com.mindspace.api.entity.Recommendation;
import com.mindspace.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByUser(User user);
    List<Recommendation> findByUserId(Long userId);
}
