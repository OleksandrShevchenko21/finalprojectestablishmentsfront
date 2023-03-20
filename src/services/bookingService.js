import {axiosService} from "./axios.service";
import {urls} from "../configs";

const bookingService = {
    getAllBookings: () => axiosService.get(urls.booking),

    saveBooking: (booking) => axiosService.post(`${urls.booking}/restaurant/${booking.restaurantId}`, booking),

    updateBookingById: (id, updatedBooking) => axiosService.patch(`${urls.booking}/${id}`, updatedBooking),

    deleteBookingById: (id) => axiosService.delete(`${urls.booking}/${id}`)
}
    export {
        bookingService
    }