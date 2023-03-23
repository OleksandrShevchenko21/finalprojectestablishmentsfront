import {axiosService} from "./axios.service";
import {urls} from "../configs";


const favoritesService = {
getFavoritesByUserName: ({userName}) => axiosService.get(`${urls.restaurants}/username/${userName}`),
}
export {
favoritesService

}