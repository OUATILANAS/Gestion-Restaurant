package com.example.restau.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restau.model.City;
import com.example.restau.model.Serie;
import com.example.restau.service.SerieService;




@RestController
@RequestMapping("/api/series")
public class SerieController {
	@Autowired
	SerieService serieService;
	@PostMapping("/")
    public void save(@RequestBody Serie serie){
		serieService.save(serie);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable (required = true) String id){
    	Serie s = serieService.findById(Integer.parseInt(id));
    	serieService.delete(s);
    }
    @GetMapping("/all")
    public List<Serie> findAll(){
        return serieService.findAll();
    }
    
    @PutMapping("/{id}")
    public Serie updateCity(@PathVariable int id, @RequestBody Serie serie) {
    	Serie existingCity = serieService.findById(id);
        if (existingCity != null) {
            existingCity.setNom(serie.getNom());
            return serieService.save(existingCity);
        }
        return null;
    }
   
}
