package com.example.restau.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restau.model.Serie;
import com.example.restau.model.Specialite;
import com.example.restau.service.SpecialiteService;


@RestController
@CrossOrigin
@RequestMapping("/api/specialites")
public class SpecialiteController {
	
	@Autowired
	private SpecialiteService specialiteService;
	
	@PostMapping("/")
    public void save(@RequestBody Specialite specialite){
		specialiteService.save(specialite);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable (required = true) String id){
    	Specialite s = specialiteService.findById(Integer.parseInt(id));
    	specialiteService.delete(s);
    }
    @GetMapping("/")
    public List<Specialite> findAll(){
        return specialiteService.findAll();
    }

    @PutMapping("/{id}")
    public Specialite updateCity(@PathVariable int id, @RequestBody Serie serie) {
    	Specialite existingCity = specialiteService.findById(id);
        if (existingCity != null) {
            existingCity.setNom(serie.getNom());
            return specialiteService.save(existingCity);
        }
        return null;
    }
   
}
