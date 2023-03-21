import {axiosService} from "./axios.service";
import {urls} from "../configs";


const userService ={
    getAllUsers: () => axiosService.get(urls.users),
    getLogIn: (user) => axiosService.post(`${urls.users}/login`,user),
    saveNewUser: (newUser) => axiosService.post(urls.users, newUser),
    updateUser: (id,updatedUser) => axiosService.patch(`${urls.users}/${id}`,updatedUser ),
    getUserById: (id) => axiosService.get(`${urls.users}/${id}`),
    deleteUserById: (id) => axiosService.delete(`${urls.users}/${id}`)
}
export{
    userService
}