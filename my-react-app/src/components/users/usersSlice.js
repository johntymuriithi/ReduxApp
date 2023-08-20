import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
// import { nanoid } from "nanoid";

let nextId = 11; // Start with 1 as the initial ID

function generateUniqueId() {
  const newId = nextId;
  nextId++; // Increment the ID for the next call
  return newId;
}

const usersURL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () =>{
    try{
        const response = await axios.get(usersURL);
        return response.data;
    } catch (err) {
        return err.message;
    }
})


export const addUser = createAsyncThunk('users/addUser', async (initialState) =>{
    try{
        const response = await axios.post(usersURL, initialState);
        return response.data;
    } catch (err) {
        return err.message;
    }
})

export const updateUser = createAsyncThunk('users/updateUser', async (initialState) =>{
    const { id } = initialState;
    try{
        const response = await axios.put(`${usersURL}/${id}`, initialState);
        return response.data;
    } catch (err) {
        return initialState;
    }
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (initialState) =>{
    const { id } = initialState;
    try{
        const response = await axios.delete(`${usersURL}/${id}`, initialState);
        if (response?.status === 200)
        {
            return initialState;
        }
        return `${response?.status} : ${response?.statusText}`

    } catch (err) {
        return err.message;
    }
})

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    //     userAdded: {
    //     reducer(state, action){
    //         console.log(action.payload);
    //         state.users.push(action.payload)
    //     },
    //     prepare(name, username, email, number, company, street){
    //         return {
    //             payload: {
    //                 id: nanoid(),
    //                 name,
    //                 username,
    //                 email,
    //                 number,
    //                 company,
    //                 street
    //             }
    //         }
    //     }
    // }
    },
    extraReducers(builder){
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.status  = 'loading';

        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status  = 'succeeded';
            const extractedData = action.payload.map(item => {
                const {
                    id,
                    name,
                    username,
                    email,
                    address: { street },
                    phone,
                    company: { name: companyName }
                } = item;
        
                return {
                    id,
                    name,
                    username,
                    email,
                    companyName,
                    street,
                    phone
                };
            });
        
            state.users = extractedData;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status  = 'failed';
            state.error = action.err.message;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            action.payload.id = generateUniqueId();

           state.users.push(action.payload);
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            if (!action.payload?.id)
            {
                console.log("Update not complete");
                return;
            }
            const { id } = action.payload;

            const userr = state.users.filter(user => user.id !== id);

            state.users = [...userr, action.payload];
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            if (!action.payload?.id)
            {
                console.log("Update not complete");
                return;
            }
            const { id } = action.payload;

            const person = state.users.filter(user => user.id !== id);

            state.users = person;
        })
    }
})

export const { userAdded } = userSlice.actions;
export const selectAllUsers = (state) => state.users.users;
export const getStatusUsers = (state) => state.users.status;
export const getErrorUsers = (state) => state.users.error;
export default userSlice.reducer;

export const selectUserById = (state, userId) => 
    state.users.users.find((user) => user.id === userId);