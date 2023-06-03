package com.example.restau.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restau.model.Specialite;

@Repository
public interface SpecialiteRepository extends JpaRepository<Specialite, Integer>{
	Specialite findById(int id);
	Specialite findByNom(String nom);
}
