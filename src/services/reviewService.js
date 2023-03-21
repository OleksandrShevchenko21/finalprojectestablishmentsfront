import {axiosService} from "./axios.service";
import {urls} from "../configs";

const reviewService ={
    getAllReviews:()=>axiosService.get(`${urls.reviews}`),
    getAllReviewsByRestaurant:(restaurantId)=>axiosService.get(`${urls.reviews}/${restaurantId}`),
    saveNewReview: (newReview,token) => axiosService.post(`${urls.reviews}/${newReview.restaurantId}/${newReview.userName}`, newReview,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),

    updateReview: (id,updatedReview) => axiosService.patch(`${urls.reviews}/${id}`,updatedReview ),
    getReviewById: (id) => axiosService.get(`${urls.reviews}/${id}`),
    deleteReviewById: (id) => axiosService.delete(`${urls.reviews}/${id}`)
}
export{
    reviewService
}