import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import "./GeneralNews.css"

import {newsActions} from "../../redux/slices/news.slices";
import {EventNewsItem} from "../NewsItem/EventNewsItem";
import {UpdateEventNewsForm} from "../UpdateForm/UpdatedEventNewsForm";

const EventNews = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEventNewsItem, setSelectedEventNewsItem] = useState(null);
    const {eventNews} = useSelector((state) => state.newsReducer);

    const initialFormValues = {

        id: "",
        eventNews: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedEventNewsItem(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
    };
    const handleUpdate = async (id, updatedEventNews) => {
        await dispatch(newsActions.updateEventNews({
            id,
            updatedEventNews
        }));
        resetForm();
    };

    const handleEdit = (eventNewsItem) => {

        // setFormValues(null);
        setShowUpdateForm(true);
        setSelectedEventNewsItem(eventNewsItem);
        setFormValues(eventNewsItem);
    };
    useEffect(() => {
        dispatch(newsActions.getAllEventNews())
    }, [])
    return (
        <div>
            {selectedEventNewsItem && (
                <UpdateEventNewsForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    eventNewsItem={selectedEventNewsItem}
                    onUpdate={() => handleUpdate(selectedEventNewsItem.id, formValues)}
                    onClose={resetForm}

                />

            )}
            <h4>EventNews:</h4>
            <div className="EventNews-container">

                {Array.isArray(eventNews) ? (eventNews.map(eventNewsItem =>
                        <EventNewsItem key={eventNewsItem.id}
                                         eventNewsItem={eventNewsItem}
                                         onEdit={handleEdit}/>)
                ) : (
                    <p>No EventNews found</p>
                )}
            </div>
        </div>
    );
};

export {EventNews};