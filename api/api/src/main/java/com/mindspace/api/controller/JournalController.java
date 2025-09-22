// package com.mindspace.api.controller;

// import com.mindspace.api.entity.Journal;
// import com.mindspace.api.entity.User;
// import com.mindspace.api.repository.JournalRepository;
// import com.mindspace.api.repository.UserRepository;
// import org.springframework.web.bind.annotation.*;

// import java.time.LocalDate;
// // import java.time.LocalDate;
// import java.util.List;

// @RestController
// @RequestMapping("/api/journals")
// @CrossOrigin(origins = "http://localhost:3000") // allow React frontend
// public class JournalController {

//     private final JournalRepository journalRepository;
//     private final UserRepository userRepository;

//     public JournalController(JournalRepository journalRepository, UserRepository userRepository) {
//         this.journalRepository = journalRepository;
//         this.userRepository = userRepository;
//     }

//     @PostMapping("/{userId}")
//     public Journal saveJournal(@PathVariable Long userId, @RequestBody Journal journal) {
//         User user = userRepository.findById(userId).orElseThrow();
//         journal.setUser(user);
//         return journalRepository.save(journal);
//     }

//     @GetMapping("/{userId}")
//     public List<Journal> getJournals(@PathVariable Long userId) {
//         return journalRepository.findByUserId(userId);
//     }

//     // ✅ Search journals by keyword
//     @GetMapping("/{userId}/search")
//     public List<Journal> searchJournals(@PathVariable Long userId, @RequestParam String keyword) {
//         return journalRepository.searchByKeyword(userId, keyword);
//     }

//     // ✅ Filter by date range
//     @GetMapping("/{userId}/filterByDate")
//     public List<Journal> filterByDate(@PathVariable Long userId,
//                                       @RequestParam String start,
//                                       @RequestParam String end) {
//         return journalRepository.findByDateRange(userId,
//                 LocalDate.parse(start), LocalDate.parse(end));
//     }

//     // ✅ Filter by mood
//     @GetMapping("/{userId}/filterByMood")
//     public List<Journal> filterByMood(@PathVariable Long userId, @RequestParam String mood) {
//         return journalRepository.findByUserIdAndMood(userId, mood);
//     }

// }


package com.mindspace.api.controller;

import com.mindspace.api.entity.Journal;
import com.mindspace.api.entity.User;
import com.mindspace.api.repository.JournalRepository;
import com.mindspace.api.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/journals")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class JournalController {

    private final JournalRepository journalRepository;
    private final UserRepository userRepository;

    public JournalController(JournalRepository journalRepository, UserRepository userRepository) {
        this.journalRepository = journalRepository;
        this.userRepository = userRepository;
    }

    // ✅ Create / Save journal
    @PostMapping("/{userId}")
    public Journal saveJournal(@PathVariable Long userId, @RequestBody Journal journal) {
        User user = userRepository.findById(userId).orElseThrow();
        journal.setUser(user);
        if (journal.getDate() == null) {
            journal.setDate(LocalDate.now());
        }
        return journalRepository.save(journal);
    }

    // ✅ Get all journals of a user
    @GetMapping("/{userId}")
    public List<Journal> getJournals(@PathVariable Long userId) {
        return journalRepository.findByUserId(userId);
    }

    // ✅ Update (edit) a journal
    @PutMapping("/{journalId}")
    public Journal updateJournal(@PathVariable Long journalId, @RequestBody Journal updatedJournal) {
        Journal existing = journalRepository.findById(journalId)
                                           .orElseThrow(() -> new RuntimeException("Journal not found"));
        existing.setContent(updatedJournal.getContent());
        existing.setMood(updatedJournal.getMood());
        // Optional: allow updating date if passed
        if (updatedJournal.getDate() != null) {
            existing.setDate(updatedJournal.getDate());
        }
        return journalRepository.save(existing);
    }

    // ✅ Delete a journal
    @DeleteMapping("/{journalId}")
    public void deleteJournal(@PathVariable Long journalId) {
        if (!journalRepository.existsById(journalId)) {
            throw new RuntimeException("Journal not found");
        }
        journalRepository.deleteById(journalId);
    }

    // ✅ Search journals by keyword
    @GetMapping("/{userId}/search")
    public List<Journal> searchJournals(@PathVariable Long userId, @RequestParam String keyword) {
        return journalRepository.searchByKeyword(userId, keyword);
    }

    // ✅ Filter by date range
    @GetMapping("/{userId}/filterByDate")
    public List<Journal> filterByDate(@PathVariable Long userId,
                                      @RequestParam String start,
                                      @RequestParam String end) {
        return journalRepository.findByDateRange(userId,
                LocalDate.parse(start), LocalDate.parse(end));
    }

    // ✅ Filter by mood
    @GetMapping("/{userId}/filterByMood")
    public List<Journal> filterByMood(@PathVariable Long userId, @RequestParam String mood) {
        return journalRepository.findByUserIdAndMood(userId, mood);
    }
}
