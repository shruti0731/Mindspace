package com.mindspace.api.controller;

import com.mindspace.api.entity.Contact;
import com.mindspace.api.repository.ContactRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public Contact saveContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }
}
