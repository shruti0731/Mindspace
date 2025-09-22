package com.mindspace.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MindspaceApiApplication {

	public static void main(String[] args) {

		SpringApplication.run(MindspaceApiApplication.class, args);
	}

}
