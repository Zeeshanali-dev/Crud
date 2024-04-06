import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const CreateUser = createAsyncThunk("createUser", async (data ,{rejectWithValue})=>{
 const response = await fetch("https://65fd99609fc4425c653257f9.mockapi.io/crud",{
    method : "POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body : JSON.stringify(data)
 })
 try {
    const result = await response.json()
    return result
 } catch (error) {
    return rejectWithValue(error)
 }
})

export const ShowUser = createAsyncThunk("ShowUser", async (args ,{rejectWithValue})=>{
    const response = await fetch("https://65fd99609fc4425c653257f9.mockapi.io/crud");

    try {
       const result = await response.json()
      
       return result
    } catch (error) {
       return rejectWithValue(error)
    }
   })

   export const deleteUser = createAsyncThunk("deleteUser", async (id ,{rejectWithValue})=>{
    const response = await fetch(`https://65fd99609fc4425c653257f9.mockapi.io/crud/${id}`, {method: "DELETE"});

    try {
       const result = await response.json()
       
       return result
    } catch (error) {
       return rejectWithValue(error)
    }
   })

   export const UpdateUser = createAsyncThunk("UpdateUser", async (data ,{rejectWithValue})=>{
    const response = await fetch(`https://65fd99609fc4425c653257f9.mockapi.io/crud/${data.id}`,{
       method : "PUT",
       headers:{
           "Content-Type" : "application/json"
       },
       body : JSON.stringify(data)
    })
    try {
       const result = await response.json()
       return result
    } catch (error) {
       return rejectWithValue(error)
    }
   })

export const userDetail = createSlice({
    name: "userDetail",
    initialState :{
        users :[],
        loading: false,
        error : null,
        serachuser :[],
    },
    reducers:{
        searchUser :(state,action)=>{
            state.serachuser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(CreateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(CreateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(ShowUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(ShowUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload
            })
            .addCase(ShowUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const {id} = action.payload;
                if (id) {
                    state.users = state.users.filter((item)=> item.id !== id)
                    
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(UpdateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users =state.users.map((item)=> (
                    item.id === action.payload.id ? action.payload : item
                ))
            })
            .addCase(UpdateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
    
});

export const {searchUser} = userDetail.actions

export default userDetail.reducer;