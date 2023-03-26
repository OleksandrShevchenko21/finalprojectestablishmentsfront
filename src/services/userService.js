import {axiosService} from "./axios.service";
import {urls} from "../configs";


const userService ={
    getAllUsers: () => axiosService.get(urls.users),
    getLogIn: (user) => axiosService.post(`${urls.users}/login`,user),
    saveNewUser: (newUser) => axiosService.post(urls.users, newUser),
    updateUser: (id,updatedUser) => axiosService.patch(`${urls.users}/${id}`,updatedUser ),
    updateUserByName: (userName,updatedUser) => axiosService.patch(`${urls.users}/${userName}`,updatedUser ),
    getUserById: (id) => axiosService.get(`${urls.users}/${id}`),
    getUserByName: ({userName}) => axiosService.get(`${urls.users}/username/${userName}`),
    deleteUserById: (id) => axiosService.delete(`${urls.users}/${id}`),
    deleteUserByUserName: ({userName}) => axiosService.delete(`${urls.users}/${userName}`)
}
export{
    userService
}