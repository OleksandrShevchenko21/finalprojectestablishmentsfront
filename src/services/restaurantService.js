import {axiosService} from "./axios.service";
import {urls} from "../configs";
// const urls = {
//     restaurants: '/api/restaurants',
//     reviews: '/api/reviews/restaurant',
//     users:'/api/users',
//     generalNews:'/api/news/general',
//     promotionNews:'/api/news/promotion',
//     eventNews:'/api/news/event',
//     booking:'/api/booking'
// }
const restaurantService = {

    getAllRestaurants: () => axiosService.get(urls.restaurants),
    getAllReviewsByRestaurant:(id)=>axiosService.get(`${urls.reviews}/${id}`),
    saveNewRestaurant: (newRestaurant) => axiosService.post(urls.restaurants, newRestaurant),
    updateRestaurant: (id,updatedRestaurant) => axiosService.patch(`${urls.restaurants}/${id}`,updatedRestaurant ),
    getRestaurantById: (id) => axiosService.get(`${urls.restaurants}/${id}`),
    deleteRestaurantById: (id) => axiosService.delete(`${urls.restaurants}/${id}`),


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
