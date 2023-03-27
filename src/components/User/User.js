import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../redux/slices/user.slice";
import "./User.css"
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {UpdateUserForm} from "../UpdateForm/UpdatedUserForm";

const User = ({user, onEdit}) => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const {users, userFromAPI} = useSelector((state) => state.userReducer);
    const [currentToken, setCurrentToken] = useState('');


    // ------------------------------------------

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const initialFormValues = {

        id: "",
        userName: "",
        password: "",
        role: "",
        number: "",
        email: "",
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedUser(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
    };
    const handleUpdateUser = async (id, updatedUser) => {
        await dispatch(userActions.updateUserByName({
            userName,
            updatedUser
        }))
        // .then(() =>
        // dispatch(userActions.logOut()))
        ;
        window.location.reload(true);
        resetForm();
    };

    const handleEdit = (user) => {

        // setFormValues(null);
        setShowUpdateForm(true);
        setSelectedUser(userFromAPI);
        setFormValues(userFromAPI);
    };

    const handleDeleteUser = async (e) => {
        await dispatch(userActions.deleteUserByUserName(userName))
            .then(() =>
                dispatch(userActions.logOut()))
        window.location.reload(true);
    }
    // ------------------------------------------
    const token = localStorage.getItem('token');
    useEffect(() => {
        setCurrentToken(token);
        if (currentToken) {
            const decodedToken = jwt_decode(token);
            setUserName(decodedToken.sub);
            dispatch(userActions.getUserByName(userName))
        }
    }, [currentToken, userName]);

    return (
        <div className="main-user-login-container">
            <div className="update-form-container">
                {selectedUser && (
                    <UpdateUserForm
                        formValues={formValues}
                        setFormValues={setFormValues}
                        user={selectedUser}
                        onUpdate={() => handleUpdateUser(selectedUser.id, formValues)}
                        onClose={resetForm}

                    />
                )}
            </div>
            <div>

                <div className="user-info-container">
                    <div className="user-login-container">
                        Welcome, {userFromAPI && userFromAPI.userName}!
                    </div>
                    <div className="user-login-container">
                        {userFromAPI && userFromAPI.role}
                    </div>
                    <div className="user-login-container">
                        {userFromAPI && userFromAPI.number}
                    </div>
                    <div className="user-login-container">
                        {userFromAPI && userFromAPI.email}
                    </div>
                    <div className="user-button-container">
                        <button
                            onClick={handleDeleteUser}>delete
                        </button>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export {User};