
import './App.css';
import {
    Header,
    NewRestaurantForm,
    Restaurants,
    Reviews, UpdateRestaurantForm,
    Users
} from "./components";

const App = () => {

    return (
        <div>
            <Header/>
            <div>
                <NewRestaurantForm/>

                <Restaurants/>
                <Reviews/>

            </div>
            <div>
                <Users/>
            </div>

        </div>
    )
}

export default App;
