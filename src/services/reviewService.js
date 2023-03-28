import {axiosService} from "./axios.service";
import {urls} from "../configs";

const setAuthHeaders = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};
const reviewService ={
    getAllReviews:()=>axiosService.get(`${urls.reviews}`),
    getAllReviewsByRestaurant:(restaurantId)=>
        axiosService.get(`${urls.reviews}/${restaurantId}`),
    saveNewReview: (newReview,token) =>
        axiosService.post(`${urls.reviews}/admin/${newReview.restaurantId}/${newReview.userName}`, newReview,setAuthHeaders(token)),

    updateReview: (id,updatedReview,token) =>
        axiosService.patch(`${urls.reviews}/admin/${id}`,updatedReview,setAuthHeaders(token)),
    getReviewById: (id) => axiosService.get(`${urls.reviews}/${id}`),
    deleteReviewById: (id,token) =>
        axiosService.delete(`${urls.reviews}/admin/${id}`,setAuthHeaders(token))
}
export{
    reviewService
}