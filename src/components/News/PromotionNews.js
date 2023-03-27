import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import "./PromotionNews.css"

import {newsActions} from "../../redux/slices/news.slices";
import {PromotionNewsItem} from "../NewsItem/PromotionNewsItem";
import {UpdatePromotionNewsForm} from "../UpdateForm/UpdatedPromotionNewsForm";

const PromotionNews = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedPromotionNewsItem, setSelectedPromotionNewsItem] = useState(null);
    const {promotionNews} = useSelector((state) => state.newsReducer);

    const initialFormValues = {

        id: "",
        promotionNews: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedPromotionNewsItem(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
    };
    const handleUpdate = async (id, updatedPromotionNews) => {
        await dispatch(newsActions.updatePromotionNews({
            id,
            updatedPromotionNews
        }));
        resetForm();
    };

    const handleEdit = (promotionNewsItem) => {

        // setFormValues(null);
        setShowUpdateForm(true);
        setSelectedPromotionNewsItem(promotionNewsItem);
        setFormValues(promotionNewsItem);
    };
    useEffect(() => {
        dispatch(newsActions.getAllPromotionNews())
    }, [])
    return (
        <div>
            <h4>PromotionNews:</h4>
            {selectedPromotionNewsItem && (
                <UpdatePromotionNewsForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    promotionNewsItem={selectedPromotionNewsItem}
                    onUpdate={() => handleUpdate(selectedPromotionNewsItem.id, formValues)}
                    onClose={resetForm}

                />

            )}
            <div className="promotionNews-container">

                {Array.isArray(promotionNews) ? (promotionNews.map(promotionNewsItem =>
                        <PromotionNewsItem key={promotionNewsItem.id}
                                           promotionNewsItem={promotionNewsItem}
                                           onEdit={handleEdit}/>)
                ) : (
                    <p>No PromotionNews found</p>
                )}
            </div>
        </div>
    );
};

export {PromotionNews};