package com.example.restau.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restau.model.Zone;


@Repository
public interface ZoneRepository extends JpaRepository<Zone, Integer> {
    List<Zone> findByCityId(int cityId);
	Zone findByName (String name);
	Zone findById(int id);

}