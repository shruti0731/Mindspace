package com.mindspace.api.repository;

import com.mindspace.api.entity.Journal;
import com.mindspace.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    List<Journal> findByUser(User user);
    List<Journal> findByUserId(Long userId);

    // Find by user and keyword in content
    @Query("SELECT j FROM Journal j WHERE j.user.id = :userId AND LOWER(j.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Journal> searchByKeyword(@Param("userId") Long userId, @Param("keyword") String keyword);

    // Filter by date range
    @Query("SELECT j FROM Journal j WHERE j.user.id = :userId AND j.date BETWEEN :startDate AND :endDate")
    List<Journal> findByDateRange(@Param("userId") Long userId,
                                  @Param("startDate") LocalDate startDate,
                                  @Param("endDate") LocalDate endDate);

    // Filter by mood
    List<Journal> findByUserIdAndMood(Long userId, String mood);

    boolean existsByUserAndDate(User user, LocalDate date);
}
