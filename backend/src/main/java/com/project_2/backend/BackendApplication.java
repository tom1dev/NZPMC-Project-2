package com.project_2.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

		//adds the DB info from the env file to systems environment variables so that application.properties can use it
		Dotenv dotenv = Dotenv.load();
		System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));
		System.setProperty("MONGODB_NAME", dotenv.get("MongoDB_NAME"));


		SpringApplication.run(BackendApplication.class, args);

	}


}
