package com.example.restau.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restau.dao.IDao;
import com.example.restau.model.City;
import com.example.restau.model.Restaurant;
import com.example.restau.model.Serie;
import com.example.restau.model.Specialite;
import com.example.restau.model.Zone;
import com.example.restau.repository.RestaurantRepository;





@Service
public class RestaurantService implements IDao<Restaurant>{
	@Autowired
	private RestaurantRepository restaurantRepository;
	@Autowired
	private CityService villeService;
	@Autowired
	private ZoneService zoneService;
	@Autowired
	private SpecialiteService specialiteRepository;
	@Autowired
	private SerieService serieService;
	@Override
	public Restaurant save(Restaurant o) {
		// TODO Auto-generated method stub
		return restaurantRepository.save(o);
	}
	@Override
	public List<Restaurant> findAll() {
		// TODO Auto-generated method stub
		return restaurantRepository.findAll();
	}
	@Override
	public Restaurant findById(int id) {
		// TODO Auto-generated method stub
		return restaurantRepository.findById(id);
	}
	@Override
	public void update(Restaurant o) {
		// TODO Auto-generated method stub
		restaurantRepository.save(o);
	}
	@Override
	public void delete(Restaurant o) {
		// TODO Auto-generated method stub
		restaurantRepository.delete(o);
	}
	
	public List<Restaurant> filterRestoByspeciality(String nomV, String nomZ, String nomS){
		City ville = villeService.findByNom(nomV);
		Zone zone = zoneService.findByNom(nomZ);
		Specialite spec = specialiteRepository.findByNom(nomS);
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
	public List<Restaurant> filterRestoBySerie(String nomV, String nomZ, String nomSerie){
		City ville = villeService.findByNom(nomV);
		Zone zone = zoneService.findByNom(nomZ);
		Serie serie = serieService.findByNom(nomSerie);
		List<Zone> zones = ville.getZone();
		
		List<Restaurant> restaurants = new ArrayList<>();
		for(Zone z : zones) {
			if(z.equals(zone)) {
				List<Restaurant> restos = z.getRestaurant();
				for(Restaurant r: restos) {
					if(r.getSerie().equals(serie)) {
						restaurants.add(r);
					}
				}
			}
		}
		return restaurants;
	}
	public Set<Specialite> findspecialityByResto(int idR) {
		Restaurant r = restaurantRepository.findById(idR);
		return r.getSpecialite();
	}
	
	public Restaurant createRestaurant(Restaurant restau) {
		return restaurantRepository.save(restau);
	}
}
