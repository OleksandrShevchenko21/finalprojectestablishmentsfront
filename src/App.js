import './App.css';
import {
    Bookings,
    EventNews,
    GeneralNews,
    Header, LoginPage,
    NewRestaurantForm, NewUserForm, PromotionNews,
    Restaurants,
    Reviews, UpdateRestaurantForm,
    Users
} from "./components";
import {NewReviewForm} from "./components/NewForm/NewReviewForm";
import {HomePage} from "./components/Pages/HomePage";

const App = () => {

    return (
        <div className="main-app">
            <Header/>
            <div>
                <HomePage/>
                {/*<NewRestaurantForm/>*/}
                {/*<Restaurants/>*/}
            </div>
        </div>
    )
}

export default App;
