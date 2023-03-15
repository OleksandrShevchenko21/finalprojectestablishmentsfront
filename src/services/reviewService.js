import {axiosService} from "./axios.service";
import {urls} from "../configs";

const reviewService ={
    getAllReviews:(restaurantId)=>axiosService.get(`${urls.reviews}/${restaurantId}`),
    saveNewReview: (newReview) => axiosService.post(urls.reviews, newReview),
    updateReview: (id,updatedReview) => axiosService.patch(`${urls.reviews}/${id}`,updatedReview ),
    getReviewById: (id) => axiosService.get(`${urls.reviews}/${id}`),
    deleteReviewById: (id) => axiosService.delete(`${urls.reviews}/${id}`)
}
export{
    reviewService
}