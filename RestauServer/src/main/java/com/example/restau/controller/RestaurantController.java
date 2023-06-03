package com.example.restau.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Time;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.restau.model.Restaurant;
import com.example.restau.model.Serie;
import com.example.restau.model.Specialite;
import com.example.restau.model.User;
import com.example.restau.model.Zone;
import com.example.restau.service.RestaurantService;
import com.example.restau.service.SerieService;




@RestController
@CrossOrigin
@RequestMapping("api/restaurants")
public class RestaurantController {
	@Autowired
	private RestaurantService restaurantService;
	@Autowired
	private SerieService serieService;
	@PostMapping(value = "/",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public void save(@RequestParam("photo") MultipartFile photo,
	                 @RequestParam("nom") String name,
	                 @RequestParam("adresse") String adresse,
	                 @RequestParam("lattitude") String latitude,
	                 @RequestParam("longitude") String longitude,
	                 @RequestParam("week") String week,
	                 @RequestParam("rank") int rank,
	                 @RequestParam("open_hour") Time openHour,
	                 @RequestParam("close_hour") Time closeHour,
	                 @RequestParam("serie") Serie selectedSerie,
	                 @RequestParam("user") User selectedUser,
	                 @RequestParam("zone") Zone selectedZone) {
	    // Create a new Restaurant object and populate it with the request parameters
	    Restaurant restaurant = new Restaurant();
	    restaurant.setNom(name);
	    restaurant.setAdresse(adresse);
	    restaurant.setLattitude(latitude);
	    restaurant.setLongitude(longitude);
	    restaurant.setWeek(week);
	    restaurant.setRank(rank);
	    restaurant.setOpen_hour(openHour);
	    restaurant.setClose_hour(closeHour);
	    restaurant.setSerie(selectedSerie);
	    restaurant.setUser(selectedUser);
	    restaurant.setZone(selectedZone);
	    // Set other properties accordingly

	    // Process the image file
	    if (photo != null && !photo.isEmpty()) {
	        // Save the image file using a file storage service or write it to a specific directory
	        String filename = photo.getOriginalFilename();
	        // Example: store the file in a directory called "uploads" within the current project
	        String filePath = Paths.get("uploads", filename).toString();
	        try {
	            Files.copy(photo.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
	            restaurant.setPhoto(filePath);
	        } catch (IOException e) {
	            // Handle the exception appropriately
	        }
	    }
	    System.out.println("Received photo: " + photo.getOriginalFilename());

	    // Save the restaurant object using your service or repository
	    restaurantService.save(restaurant);
	}

    @DeleteMapping("/{id}")
    public void delete(@PathVariable (required = true) String id){
    	Restaurant r = restaurantService.findById(Integer.parseInt(id));
        restaurantService.delete(r);
    }
    

    
    @GetMapping("/")
    public List<Restaurant> findAll(){
        return restaurantService.findAll();
    }
    
    @PutMapping("/{id}")
    public Restaurant updateRestaurant(
        @PathVariable("id") int id,
        @RequestPart("restaurant") Restaurant updatedRestaurant,
        @RequestParam(value = "photo", required = false) MultipartFile photo
    ) {
        Restaurant existingRestaurant = restaurantService.findById(id);
        
        if (existingRestaurant != null) {
            // Update the fields of the existing restaurant object with the updated values
            existingRestaurant.setNom(updatedRestaurant.getNom());
            existingRestaurant.setAdresse(updatedRestaurant.getAdresse());
            existingRestaurant.setLattitude(updatedRestaurant.getLattitude());
            existingRestaurant.setLongitude(updatedRestaurant.getLongitude());
            existingRestaurant.setWeek(updatedRestaurant.getWeek());
            existingRestaurant.setRank(updatedRestaurant.getRank());
            existingRestaurant.setOpen_hour(updatedRestaurant.getOpen_hour());
            existingRestaurant.setClose_hour(updatedRestaurant.getClose_hour());
            
            // Find the persisted Serie object using its ID
            Serie existingSerie = serieService.findById(updatedRestaurant.getSerie().getId());
            
            if (existingSerie != null) {
                // Update the Serie reference of the restaurant with the persisted Serie object
                existingRestaurant.setSerie(existingSerie);
                
                // Process the image file if it is provided
                if (photo != null && !photo.isEmpty()) {
                    // Save the image file using a file storage service or write it to a specific directory
                    String filename = photo.getOriginalFilename();
                    // Example: store the file in a directory called "uploads" within the current project
                    String filePath = Paths.get("uploads", filename).toString();
                    try {
                        Files.copy(photo.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
                        existingRestaurant.setPhoto(filePath);
                    } catch (IOException e) {
                        // Handle the exception appropriately
                    }
                }
                
                // Save the updated Restaurant object
                return restaurantService.createRestaurant(existingRestaurant);
            } else {
                // Handle the case when the Serie object is not found
                throw new IllegalArgumentException("Invalid Serie ID");
            }
        } else {
            // Handle the case when the Restaurant object is not found
            throw new IllegalArgumentException("Invalid Restaurant ID");
        }
    }

    @GetMapping("/{nomV}/zones/{nomZ}/restaurants/specialite/{nomS}")
    public List<Restaurant> filterRestoByspeciality(@PathVariable String nomV,@PathVariable String nomZ,@PathVariable String nomS){
    	return restaurantService.filterRestoByspeciality(nomV, nomZ, nomS);
    }
    @GetMapping("/{nomV}/zones/{nomZ}/restaurants/serie/{nomSerie}")
    public List<Restaurant> filterRestoBySerie(@PathVariable String nomV,@PathVariable String nomZ,@PathVariable String nomSerie){
    	return restaurantService.filterRestoBySerie(nomV, nomZ, nomSerie);
    }
    @GetMapping("/{id}")
    public Restaurant findRestaurantById(@PathVariable int id){
        return restaurantService.findById(id);
    }
    @GetMapping("/{idR}/specialite")
    public Set<Specialite> findspecialityByResto(@PathVariable int idR){
    	return restaurantService.findspecialityByResto(idR);
    }
}
