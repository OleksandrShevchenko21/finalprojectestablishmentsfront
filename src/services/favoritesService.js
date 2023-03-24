import {axiosService} from "./axios.service";
import {urls} from "../configs";


const favoritesService = {
    addRestaurantToFavorites: (id, userName, restaurant) => axiosService.post(`${urls.restaurants}/${id}/username/${userName}`, restaurant),
    getFavoritesByUserName: ({userName}) => axiosService.get(`${urls.restaurants}/username/${userName}`),
    deleteFavoritesByUserName: (id, userName) => axiosService.delete(`${urls.restaurants}/${id}/delete/${userName}`),
}
export {
    favoritesService

}