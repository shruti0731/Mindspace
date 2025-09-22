package com.mindspace.api.service;

import com.mindspace.api.entity.User;
import com.mindspace.api.repository.UserRepository;
import com.mindspace.api.repository.JournalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmailReminderService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JournalRepository journalRepository;

    // helper method
    public void sendReminder(String toEmail, String userName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("MindSpace - Daily Journal Reminder ✍️");
        message.setText("Hi " + userName + ",\n\nDon’t forget to write your journal today. Your thoughts matter 💜");

        mailSender.send(message);
    }

    // ✅ Scheduled: every day at 8 PM
    @Scheduled(cron = "0 0 20 * * ?")
    public void sendDailyReminders() {
        LocalDate today = LocalDate.now();

        // 1. Fetch all users
        List<User> users = userRepository.findAll();

        for (User user : users) {
            // 2. Check if user already added a journal today
            boolean hasJournal = journalRepository.existsByUserAndDate(user, today);

            // 3. Send reminder if no journal
            if (!hasJournal) {
                sendReminder(user.getEmail(), user.getName());
            }
        }
    }
}
