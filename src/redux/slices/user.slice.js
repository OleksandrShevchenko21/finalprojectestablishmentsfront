import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../../services";


const initialState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    oneUser: null,
    newUser: null,
    token: null,
    role: null
}

const getAllUsers = createAsyncThunk(
    'userSlice/getAllUsers',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getAllUsers();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const setCurrentUser = (state, action) => {
    state.currentUser = action.payload.user;
    state.token = action.payload.token;
    state.role = action.payload.role;
}

const getLogIn = createAsyncThunk(
    'userSlice/getLogIn',
    async (user, {rejectWithValue,dispatch}) => {
        try {
            const {data, headers} = await userService.getLogIn(user);
            const token = headers.authorization;
            const { user: loggedInUser } = data;

            // localStorage.removeItem("token");

            localStorage.setItem('token', token);
            dispatch(setCurrentUser({ user: loggedInUser, token,}));
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const logOut = createAsyncThunk(
    'userSlice/getLogOut',
        async (_, {rejectWithValue, dispatch}) => {
            try {
                localStorage.removeItem('token');
                dispatch(setCurrentUser({ user: null, token: null }));
                return true;
            } catch (e) {
                return rejectWithValue(e.response.data)
            }
        }
    );

const getUserByID = createAsyncThunk(
    'userSlice/getUserById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserById(id);
            console.log(data);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
const getUserByName = createAsyncThunk(
    'userSlice/getUserByName',
    async (userName, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserByName(userName);
            console.log(data.role);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
// SAVE-------------------------SAVE---------------------------SAVE-------------------------------
const saveNewUser = createAsyncThunk(
    'userSlice/saveNewUser',
    async (newUser, {rejectWithValue, dispatch}) => {
        const jsonBody = JSON.stringify(newUser);
        try {
            const {data} = await userService.saveNewUser(newUser);
            dispatch(getAllUsers());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
// UPDATE-------------------------UPDATE---------------------------UPDATE-------------------------------
const updateUser = createAsyncThunk(
    "userSlice/updateUser",
    async ({id, updatedUser}, {rejectWithValue, dispatch}) => {
        const jsonBody = JSON.stringify(updatedUser);

        try {

            const {data} = await userService.updateUser(id, updatedUser);
            dispatch(getAllUsers());
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
// DELETE-------------------------DELETE---------------------------DELETE-------------------------------
const deleteUserByID = createAsyncThunk(
    'userSlice/deleteUserById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await userService.deleteUserById(id);
            dispatch(removeUserSuccess(id));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);
// const updateRole = createAction('userSlice/updateRole', (role) => {
//     return {
//         payload: role
//     }
// })
const updateRole = createAsyncThunk(
    'userSlice/updateRole',
    async (role) => {
    return {
        payload: role
    }
})
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        // setCurrentUser: (state, action) => {
        //     state.currentUser = {
        //         ...action.payload.user,
        //         role: action.payload.role
        //     };
        //     state.token = action.payload.token;
        //     console.log('Current user:', state.currentUser);
        // },
        removeCurrentUser: (state) => {
            state.currentUser = null;
            state.token = null;
        },
        // ----------------------------------------------------------------------------
        removeUserSuccess: (state, action) => {
            state.users = state.users.filter((r) => r.id !== action.payload);
        },
        removeUserError: (state, action) => {
            state.error = action.payload;
        },
        updateRole
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(getLogIn.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.role;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.loading = false;
                state.currentUser = null;
                state.token = null;
                state.role = null;
            })
            .addCase(getUserByID.fulfilled, (state, action) => {
                state.oneUser = action.payload
            })
            .addCase(getUserByName.fulfilled, (state, action) => {
                state.oneUser = action.payload


            })
            .addCase(deleteUserByID.fulfilled, (state, action) => {
                // state.Users = state.Users.filter(
                //     (User) => User.id !== action.payload.id
                // );
            })
            .addCase(saveNewUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.oneUser = action.payload
                state.users = state.users.map((user) => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return user;
                    }

                })

            })


});
const {
    reducer: userReducer,
    actions: {removeUserSuccess,}
} = userSlice;

const userActions = {
    getAllUsers,
    // setCurrentUser,
    getUserByID,
    saveNewUser,
    deleteUserByID,
    updateUser,
    getLogIn,
    logOut,
    getUserByName
}
export {
    userReducer,
    userActions
}