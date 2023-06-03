package com.example.restau.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restau.dao.IDao;
import com.example.restau.model.Serie;
import com.example.restau.repository.SerieRepository;


@Service
public class SerieService implements IDao<Serie> {
	@Autowired
	SerieRepository serieRepository;
	@Override
	public Serie save(Serie o) {
		// TODO Auto-generated method stub
		return serieRepository.save(o);
	}

	@Override
	public List<Serie> findAll() {
		// TODO Auto-generated method stub
		return serieRepository.findAll();
	}

	@Override
	public Serie findById(int id) {
		// TODO Auto-generated method stub
		return serieRepository.findById(id);
	}

	@Override
	public void update(Serie o) {
		// TODO Auto-generated method stub
		serieRepository.save(o);
	}

	@Override
	public void delete(Serie o) {
		// TODO Auto-generated method stub
		serieRepository.delete(o);
	}
	public Serie findByNom(String nom) {
		return serieRepository.findByNom(nom);
	}

}
