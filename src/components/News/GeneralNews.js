import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import "./GeneralNews.css"

import {newsActions} from "../../redux/slices/news.slices";
import {GeneralNewsItem} from "../NewsItem/GeneralNewsItem";
import {UpdateGeneralNewsForm} from "../UpdateForm/UpdatedGeneralNewsForm";

const GeneralNews = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedGeneralNewsItem, setSelectedGeneralNewsItem] = useState(null);
    const {generalNews} = useSelector((state) => state.newsReducer);

    const initialFormValues = {

        id: "",
        generalNews: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedGeneralNewsItem(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
    };
    const handleUpdate = async (id, updatedGeneralNews) => {
        await dispatch(newsActions.updateGeneralNews({
            id,
            updatedGeneralNews
        }));
        resetForm();
    };

    const handleEdit = (generalNewsItem) => {
        setShowUpdateForm(true);
        setSelectedGeneralNewsItem(generalNewsItem);
        setFormValues(generalNewsItem);
    };
    useEffect(() => {
        dispatch(newsActions.getAllGeneralNews())
    }, [])
    return (
        <div>
            <h4>GeneralNews:</h4>
            {selectedGeneralNewsItem && (
                <UpdateGeneralNewsForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    generalNewsItem={selectedGeneralNewsItem}
                    onUpdate={() => handleUpdate(selectedGeneralNewsItem.id, formValues)}
                    onClose={resetForm}

                />

            )}
            <div className="generalNews-container">

                {Array.isArray(generalNews) ? (generalNews.map(generalNewsItem =>
                        <GeneralNewsItem key={generalNewsItem.id}
                              generalNewsItem={generalNewsItem}
                              onEdit={handleEdit}/>)
                ) : (
                    <p>No GeneralNews found</p>
                )}
            </div>
        </div>
    );
};

export {GeneralNews};