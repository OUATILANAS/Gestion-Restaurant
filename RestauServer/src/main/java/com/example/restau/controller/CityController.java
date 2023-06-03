package com.example.restau.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restau.model.City;
import com.example.restau.model.Restaurant;
import com.example.restau.service.CityService;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping("")
    public List<City> getAllCities() {
        return cityService.getAllCities();
    }

    @GetMapping("/{id}")
    public City getCityById(@PathVariable int id) {
        return cityService.getCityById(id);
    }

    @PostMapping("/")
    public City createCity(@RequestBody City city) {
        return cityService.saveCity(city);
    }

    @PutMapping("/{id}")
    public City updateCity(@PathVariable int id, @RequestBody City city) {
        City existingCity = cityService.getCityById(id);
        if (existingCity != null) {
            existingCity.setName(city.getName());
            return cityService.saveCity(existingCity);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable int id) {
        cityService.deleteCity(id);
    }
    
    @GetMapping("/{nomV}/zones/{nomZ}/restaurants")
    public List<Restaurant> findRestoByZone(@PathVariable int nomV,@PathVariable int nomZ){
    	return cityService.findRestoByZone(nomV, nomZ);
    }
}
