import {Restaurants} from "../Restaurants/Restaurants";
import {FilterPage} from "./FilterPage";
import {NewRestaurantForm} from "../NewForm/NewRestaurantForm";
import './HomePage.css';
import {GeneralNews} from "../News/GeneralNews";
import {PromotionNews} from "../News/PromotionNews";
import {EventNews} from "../News/EventNews";

const HomePage = () => {
    return (

        <div className="main-container">
            <div className="first-container">

            <FilterPage/>
            </div>
            <div className="second-container">
                <NewRestaurantForm/>
                <Restaurants/>
            </div>
            <div className="third-container">

                <GeneralNews/>

                <PromotionNews/>

                <EventNews/>
            </div>
        </div>
    );
};
export {HomePage};