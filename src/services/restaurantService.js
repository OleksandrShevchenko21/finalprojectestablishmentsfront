import {axiosService} from "./axios.service";
import {urls} from "../configs";

const restaurantService = {

    getAllRestaurants: () => axiosService.get(urls.restaurants),
    getAllReviewsByRestaurant:(id)=>axiosService.get(`${urls.reviews}/${id}`),
    saveNewRestaurant: (newRestaurant) => axiosService.post(urls.restaurants, newRestaurant),
    updateRestaurant: (id,updatedRestaurant) => axiosService.patch(`${urls.restaurants}/${id}`,updatedRestaurant ),
    getRestaurantById: (id) => axiosService.get(`${urls.restaurants}/${id}`),
    deleteRestaurantById: (id) => axiosService.delete(`${urls.restaurants}/${id}`),

    getRestaurantsByRating:()=>axiosService.get(`${urls.restaurants}/sorted-by-rating`),
    getRestaurantsByNameAsc:()=>axiosService.get(`${urls.restaurants}/sorted-by-order-by-name/asc`),
    getRestaurantsByNameDesc:()=>axiosService.get(`${urls.restaurants}/sorted-by-order-by-name/desc`),
    getRestaurantsByRatingGreaterThanEqual:(minRating)=>axiosService.get(`${urls.restaurants}/filter/average-rating?minRating=${minRating}`),
}
export {
    restaurantService

}
