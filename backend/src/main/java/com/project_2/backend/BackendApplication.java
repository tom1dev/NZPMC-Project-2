package com.project_2.backend;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableAutoConfiguration(exclude = { DataSourceAutoConfiguration.class })
public class BackendApplication {

	public static void main(String[] args) {

		//adds the DB info from the env file to systems environment variables so that application.properties can use it
		Dotenv dotenv = Dotenv.load();
		System.setProperty("MONGODB_URI", dotenv.get("MONGODB_URI"));
		System.setProperty("MONGODB_NAME", dotenv.get("MONGODB_NAME"));


		SpringApplication.run(BackendApplication.class, args);

	}


}
