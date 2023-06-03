package com.example.restau.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restau.model.City;



@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
	City findById(int id);
	City findByName(String name);
}
