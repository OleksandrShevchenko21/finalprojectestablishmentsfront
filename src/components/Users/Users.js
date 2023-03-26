// import {useDispatch, useSelector} from "react-redux";
// import {useEffect, useState} from "react";
// import {userActions} from "../../redux/slices/user.slice";
// import {User} from "../User/User";
// import "./Users.css"
// import {UpdateUserForm} from "../UpdateForm/UpdatedUserForm";
// import jwt_decode from "jwt-decode";
//
// const Users = () => {
//     const dispatch = useDispatch();
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [userName, setUserName] = useState('');
//     const {users, userFromAPI} = useSelector((state) => state.userReducer);
//
//     const initialFormValues = {
//
//         id: "",
//         userName: "",
//         password: "",
//         role: ""
//     };
//     const [formValues, setFormValues] = useState(initialFormValues);
//     const resetForm = () => {
//         setSelectedUser(null);
//         setShowUpdateForm(false);
//         setFormValues(initialFormValues);
//     };
//     // const handleUpdate = async (id, updatedUser) => {
//     //     await dispatch(userActions.updateUser({
//     //         id,
//     //         updatedUser
//     //     }));
//     //     resetForm();
//     // };
//
//     const handleEdit = (user) => {
//
//         // setFormValues(null);
//         setShowUpdateForm(true);
//         setSelectedUser(user);
//         setFormValues(user);
//     };
//
//     const token = localStorage.getItem('token');
//     useEffect(() => {
//         if (token) {
//             const decodedToken = jwt_decode(token);
//             setUserName(decodedToken.sub);
//             console.log(userName);
//         }
//             dispatch(userActions.getUserByName(userName))
//     }, [userName])
//     console.log(users);
//     return (
//         <div>
//             {/*{selectedUser && (*/}
//             {/*    <UpdateUserForm*/}
//             {/*        formValues={formValues}*/}
//             {/*        setFormValues={setFormValues}*/}
//             {/*        user={selectedUser}*/}
//             {/*        onUpdate={() => handleUpdate(selectedUser.id, formValues)}*/}
//             {/*        onClose={resetForm}*/}
//
//             {/*    />*/}
//
//             {/*)}*/}
//             <h4>Users:</h4>
//             <div className="users-container">
//                 {userFromAPI&&userFromAPI.role}
//             </div>
//         </div>
//     );
// };
//
// export {Users};