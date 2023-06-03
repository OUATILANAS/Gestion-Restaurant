package com.example.restau.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restau.exception.ResourceNotFoundException;
import com.example.restau.model.Zone;
import com.example.restau.repository.ZoneRepository;



@Service
public class ZoneService {

	@Autowired
	private ZoneRepository zoneRepository;

	public List<Zone> getAllZones() {
		return zoneRepository.findAll();
	}

	public List<Zone> getZonesByCityId(int cityId) {
		return zoneRepository.findByCityId(cityId);
	}

	public Zone getZoneById(int id) {
		return zoneRepository.findById(id);
	}

	public Zone createZone(Zone zone) {
		return zoneRepository.save(zone);
	}

	public Zone updateZone(int id, Zone zoneDetails) {
		Zone zone = zoneRepository.findById(id);
		zone.setName(zoneDetails.getName());
		zone.setCity(zoneDetails.getCity());
		return zoneRepository.save(zone);
	}

	public void deleteZone(int id) {
		Zone zone = zoneRepository.findById(id);
		zoneRepository.delete(zone);
	}
	
	public Zone findById(int id) {
		return zoneRepository.findById(id);
	}
	
	public Zone findByNom(String nom) {
		return zoneRepository.findByName(nom);
	}
}
