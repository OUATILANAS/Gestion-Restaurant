package com.example.restau.model;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;



@Entity
public class Serie {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	private String nom;
	public Serie() {
		super();
	}
	
	public Serie(int id, String nom) {
		super();
		this.id = id;
		this.nom = nom;
	}

	public Serie(int id, String nom, List<Restaurant> restaurant) {
		super();
		this.id = id;
		this.nom = nom;
		this.restaurant = restaurant;
	}

	@OneToMany(mappedBy = "serie", fetch = FetchType.EAGER)
	@JsonIgnore
	private List<Restaurant> restaurant;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public List<Restaurant> getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(List<Restaurant> restaurant) {
		this.restaurant = restaurant;
	}
	
	
}
