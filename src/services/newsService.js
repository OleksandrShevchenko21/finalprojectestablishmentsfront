import {axiosService} from "./axios.service";
import {urls} from "../configs";

const newsService ={
    getAllGeneralNews:()=>axiosService.get(urls.generalNews),
    // getAllPromotionNews:()=>axiosService.get(urls.promotionNews),
    // getAllEventNews:()=>axiosService.get(urls.eventNews),

    saveGeneralNews:(generalNews)=>axiosService.post(`${urls.generalNews}/${generalNews.restaurantId}`,generalNews),
    savePromotionNews:(promotionNews)=>axiosService.post(`${urls.promotionNews}/${promotionNews.restaurantId}`,promotionNews),
    saveEventNews:(eventNews)=>axiosService.post(`${urls.eventNews}/${eventNews.restaurantId}`,eventNews),

    updateGeneralNewsById:(id,updatedGeneralNews)=>axiosService.patch(`${urls.generalNews}/${id}`,updatedGeneralNews),
    // updatePromotionNewsById:(id,updatedPromotionNew)=>axiosService.patch(`${urls.promotionNews}/${id}`,updatedPromotionNew),
    // updateEventNewsById:(id,updatedEventNew)=>axiosService.patch(`${urls.eventNews}/${id}`,updatedEventNew),

    deleteGeneralNewsById:(id)=>axiosService.delete(`${urls.generalNews}/${id}`),
    // deletePromotionNewsById:(id)=>axiosService.delete(`${urls.promotionNews}/${id}`),
    // deleteEventNewsById:(id)=>axiosService.delete(`${urls.eventNews}/${id}`),

}
export{
    newsService
}