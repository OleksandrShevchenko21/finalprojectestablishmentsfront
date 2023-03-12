import {axiosService} from "./axios.service";
import {urls} from "../configs";

const reviewService ={
    getAll:()=>axiosService.get(urls.reviews)
}
export{
    reviewService
}