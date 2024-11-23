import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipe } from '../redux/slices/recipeSlice'


const Home = () => {
    const dispatch = useDispatch()
    const {allRecipe,loading,errorMsg}= useSelector(state=>state.recipeReducer)

    const [currentPage,setCurrentPage] = useState(1)
    const recipePerPage = 8
    const totalPages = Math.ceil(allRecipe?.length/recipePerPage)
    const currentPageRecipeLastIndex = currentPage* recipePerPage
    const currentPageRecipeFirstIndex = currentPageRecipeLastIndex - recipePerPage
    const visibleAllRecipe = allRecipe?.slice(currentPageRecipeFirstIndex,currentPageRecipeLastIndex)

    useEffect(()=>{
        dispatch(fetchRecipe())
    },[])

    const navigateToNextPage = ()=>{
      if(currentPage!=totalPages){
        setCurrentPage(currentPage+1)
      }
    }
  
    const navigateToPrevPage = ()=>{
      if(currentPage!=1){
        setCurrentPage(currentPage-1)
      }
    }
  return (
    <>
    <Header insideHome={true}/>
    <div  style={{paddingTop:'100px'}} className='container px-4 mx-auto'>
        <>
        <div className="grid grid-cols-4 gap-4">
        
        { 
         allRecipe?.length>0?
          visibleAllRecipe?.map(recipe=>(
            <div key={recipe?.id} className="rounded border p-2 shadow">
            <img width={'100%'} height={'200px'} src={recipe?.image} alt="" />
            <div className="text-center">
              <h3 className='text-xl font-bold'>{recipe?.name}</h3>
              <Link to={`/${recipe?.id}/view`} className='bg-green-600 rounded text-white inline-block
               p-1 mt-3'>View Recipe</Link>
            </div>
          </div>
          ))
          :
          <div className="flex justify-center item-center font-bold text-red-600 my-5 text-lg">
          Recipe Not Fount!!!
        </div>

        
          }
        
        </div>
        <div className="text-2xl font-bold text-center mt-20">
          <span onClick={navigateToPrevPage} className='cursor-pointer'><i className="fa-solid fa-backward me-5"></i></span>
          <span>{currentPage} of {totalPages}</span>
          <span onClick={navigateToNextPage} className='cursor-pointer'><i className="fa-solid fa-forward ms-5"></i></span>
        </div>
        </>
    </div>

    </>
  )
}

export default Home