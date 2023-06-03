package com.example.restau.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restau.model.Serie;

@Repository
public interface SerieRepository extends JpaRepository<Serie, Integer> {
	Serie findById(int id);
	Serie findByNom(String nomSerie);
	

}
