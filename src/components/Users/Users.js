import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {userActions} from "../../redux/slices/user.slice";
import {User} from "../User/User";
import "./Users.css"
import {UpdateUserForm} from "../User/UpdatedUserForm";

const Users = () => {
    const dispatch = useDispatch();
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const {users} = useSelector((state) => state.userReducer);

    const initialFormValues = {

        id: "",
        userName: "",
        password: "",
        role:""
    };
    const [formValues, setFormValues] = useState(initialFormValues);
    const resetForm = () => {
        setSelectedUser(null);
        setShowUpdateForm(false);
        setFormValues(initialFormValues);
    };
    const handleUpdate = async (id, updatedUser) => {
        await dispatch(userActions.updateUser({
            id,
            updatedUser
        }));
        resetForm();
    };

    const handleEdit = (user) => {

        // setFormValues(null);
        setShowUpdateForm(true);
        setSelectedUser(user);
        setFormValues(user);
    };
    useEffect(() => {
        dispatch(userActions.getAllUsers())
    }, [])
    return (
        <div>
            {selectedUser && (
                <UpdateUserForm
                    formValues={formValues}
                    setFormValues={setFormValues}
                    user={selectedUser}
                    onUpdate={() => handleUpdate(selectedUser.id, formValues)}
                    onClose={resetForm}

                />

            )}
            <h4>Users:</h4>
            <div className="users-container">

                {Array.isArray(users) ? (users.map(user =>
                        <User key={user.id}
                              user={user}
                                    onEdit={handleEdit}/>)
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export {Users};