import {axiosService} from "./axios.service";
import {urls} from "../configs";

const restaurantService ={

    getAllRestaurants:()=>axiosService.get(urls.restaurants),
    saveNewRestaurant:(newRestaurant)=>axiosService.post(urls.restaurants, newRestaurant),
    getRestaurantById:(id)=>axiosService.get(`${urls.restaurants}/${id}`),
    deleteRestaurantById:(id)=>axiosService.delete(`${urls.restaurants}/${id}`)
}
export{
    restaurantService
}