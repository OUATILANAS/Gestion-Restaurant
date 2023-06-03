package com.example.restau.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restau.model.City;
import com.example.restau.model.Restaurant;
import com.example.restau.model.Specialite;
import com.example.restau.model.Zone;
import com.example.restau.repository.CityRepository;






@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;
    
   
	@Autowired
	private ZoneService zoneService;
	@Autowired
	private SpecialiteService specialiteService;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City getCityById(int id) {
        City city = cityRepository.findById(id);
        return city;
    }

    public City saveCity(City city) {
        return cityRepository.save(city);
    }

    public void deleteCity(int id) {
        cityRepository.deleteById(id);
    }
    
	public City findById(int id) {
		return cityRepository.findById(id);
	}
	
	public City findByNom (String nom) {
		return cityRepository.findByName(nom);
	}
	public List<Zone> findZonesByVille (String nom){
		City v = cityRepository.findByName(nom);
		return v.getZone();
	}
	public List<Restaurant> findRestoByZone(int nomV, int nomZ){
		City city = cityRepository.findById(nomV);
		System.out.println(city);
		Zone zone = zoneService.findById(nomZ);
		
		List<Zone> zones = city.getZone();
		
		for(Zone z : zones) {
			if(z.equals(zone)) {
				return z.getRestaurant();
			}
		}
		return null;
	}
	public List<Restaurant> filterRestoByspeciality(String nomV, String nomZ, String nomS){
		City ville = cityRepository.findByName(nomV);
		Zone zone = zoneService.findByNom(nomZ);
		Specialite spec = specialiteService.findByNom(nomS);
		List<Zone> zones = ville.getZone();
		
		List<Restaurant> restaurants = new ArrayList<>();
		for(Zone z : zones) {
			if(z.equals(zone)) {
				List<Restaurant> restos = z.getRestaurant();
				for(Restaurant r: restos) {
					if(r.getSpecialite().contains(spec)) {
						restaurants.add(r);
					}
				}
			}
		}
		return restaurants;
	}
}
