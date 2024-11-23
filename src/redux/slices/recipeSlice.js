import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipe = createAsyncThunk("recipe/fetchRecipe",async()=>{
    const result= await axios.get("https://dummyjson.com/recipes")
    // console.log( result.data.recipes);
    sessionStorage.setItem("allRecipe",JSON.stringify(result.data.recipes))
    return result.data.recipes
    
})

const recipeSlice = createSlice({
    name:'recipe',
    initialState:{
        allRecipe:[],
        dummyAllRecipe:[],
        loading:false,
        errorMsg:""
    },
    reducers:{
        searchRecipe : (state,actionByHeader)=>{
            state.allRecipe =state.dummyAllRecipe.filter(item=>item.cuisine.toLowerCase().includes(actionByHeader.payload))
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRecipe.fulfilled,(state,apiResult)=>{
            state.allRecipe = apiResult.payload
            state.dummyAllRecipe = apiResult.payload
            state.loading = false
            state.errorMsg = ""
        })
        builder.addCase(fetchRecipe.pending,(state)=>{
            state.allRecipe = []
            state.dummyAllRecipe = []
            state.loading = true
            state.errorMsg = ""
        })
        builder.addCase(fetchRecipe.rejected,(state)=>{
            state.allRecipe = []
            state.dummyAllRecipe = []
            state.loading = false
            state.errorMsg = "API Call failed"
        })
    }
})

export const {searchRecipe} = recipeSlice.actions
export default recipeSlice.reducer
