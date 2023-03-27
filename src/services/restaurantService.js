import {axiosService} from "./axios.service";
import {urls} from "../configs";

const setAuthHeaders = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
const restaurantService = {

    getAllRestaurants: () => axiosService.get(urls.restaurants),
    getAllReviewsByRestaurant:(id)=>axiosService.get(`${urls.reviews}/${id}`),
    saveNewRestaurant: (newRestaurant,token) =>
        axiosService.post
        (`${urls.restaurants}/admin`, newRestaurant,setAuthHeaders(token)),
    updateRestaurant: (id,updatedRestaurant,token) =>
        axiosService.patch
        (`${urls.restaurants}/admin/${id}`,updatedRestaurant,setAuthHeaders(token) ),
    getRestaurantById: (id) =>
        axiosService.get(`${urls.restaurants}/${id}`),
    deleteRestaurantById: (id,token) =>
        axiosService.delete(`${urls.restaurants}/admin/${id}`,setAuthHeaders(token)),


    getRestaurantsByRatingAsc:()=>axiosService.get(`${urls.restaurants}/sorted-by-rating-asc`),
    getRestaurantsByRatingDesc:()=>axiosService.get(`${urls.restaurants}/sorted-by-rating-desc`),
    getRestaurantsByNameAsc:()=>axiosService.get(`${urls.restaurants}/sorted-by-order-by-name/asc`),
    getRestaurantsByNameDesc:()=>axiosService.get(`${urls.restaurants}/sorted-by-order-by-name/desc`),
    getRestaurantsByRatingGreaterThanEqual:(minRating)=>axiosService.get(`${urls.restaurants}/filter/average-rating?minRating=${minRating}`),
    getRestaurantsByType:(type)=>axiosService.get(`${urls.restaurants}/filter/type?type=${type}`),
    getRestaurantsByAverageCheck:(minCheck,maxCheck)=>axiosService.get(`${urls.restaurants}/filter/average-check/between?minAvgCheck=${minCheck}&maxAvgCheck=${maxCheck}`),
    getRestaurantsByPublishDateAsc:()=>axiosService.get(`${urls.restaurants}/sorted-by-date-of-publish=asc`),
    getRestaurantsByPublishDateDesc:()=>axiosService.get(`${urls.restaurants}/sorted-by-date-of-publish=desc`),
    getRestaurantsFindByName:(restaurantName)=>axiosService.get(`${urls.restaurants}/filter/name?restaurantName=${restaurantName}`)
}
export {
    restaurantService

}
