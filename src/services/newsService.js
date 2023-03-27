import {axiosService} from "./axios.service";
import {urls} from "../configs";

    const setAuthHeaders = (token) => {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };
const newsService ={


    getAllGeneralNews:()=>axiosService.get(urls.generalNews),
    getAllPromotionNews:()=>axiosService.get(urls.promotionNews),
    getAllEventNews:()=>axiosService.get(urls.eventNews),

    saveGeneralNews:(generalNews,token)=>
        axiosService.post
        (`${urls.generalNews}/admin/${generalNews.restaurantId}`,generalNews, setAuthHeaders(token)),
    // saveGeneralNews:(generalNews,token)=>axiosService.post(`${urls.generalNews}/${generalNews.restaurantId}`,generalNews,token),
    savePromotionNews:(promotionNews,token)=>
        axiosService.post
        (`${urls.promotionNews}/admin/${promotionNews.restaurantId}`,promotionNews,setAuthHeaders(token)),
    saveEventNews:(eventNews,token)=>
        axiosService.post
        (`${urls.eventNews}/admin/${eventNews.restaurantId}`,eventNews,setAuthHeaders(token)),

    updateGeneralNewsById:(id,updatedGeneralNews,token)=>
        axiosService.patch
        (`${urls.generalNews}/admin/${id}`,updatedGeneralNews,setAuthHeaders(token)),
    updatePromotionNewsById:(id,updatedPromotionNew,token)=>
        axiosService.patch
        (`${urls.promotionNews}/admin/${id}`,updatedPromotionNew,setAuthHeaders(token)),
    updateEventNewsById:(id,updatedEventNew,token)=>
        axiosService.patch
        (`${urls.eventNews}/${id}`,updatedEventNew,setAuthHeaders(token)),

    deleteGeneralNewsById:(id,token)=>axiosService.delete(`${urls.generalNews}/admin/${id}`,setAuthHeaders(token)),
    deletePromotionNewsById:(id,token)=>axiosService.delete(`${urls.promotionNews}/admin/${id}`,setAuthHeaders(token)),
    deleteEventNewsById:(id,token)=>axiosService.delete(`${urls.eventNews}/admin/${id}`,setAuthHeaders(token)),

}
export{
    newsService
}