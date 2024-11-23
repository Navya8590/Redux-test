import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'


const View = () => {
  const [recipe,setRecipe]= useState({})
  const {id} = useParams()
  console.log(id);
  console.log(recipe);
  
 

  useEffect(()=>{
    if(sessionStorage.getItem("allRecipe")){
      const allRecipe = JSON.parse(sessionStorage.getItem("allRecipe"))
      console.log(allRecipe.find(item=>item.id==id));
      setRecipe(allRecipe.find(item=>item.id==id))
    }
  },[])
  

  return (
    <>
    <Header/>
    <div className='flex flex-col mx-5 '>
      <div className="grid grid-cols-2 items-center h-screen mt-7">
      <img width={'350px'} height={'250px'} src={recipe?.image} alt="" />
      <div>
      <h3 className='font-bold text-2xl '>Name :{recipe?.name}</h3>
      <h1 className='font-bold'>Ingredients :{recipe?.ingredients}</h1>
      <h4 className='font-bold '>Instructions:{recipe?.instructions}</h4>
     
       <h3 className='font-bold mt-4'>Cuisine:{recipe?.cuisine}</h3>
         <h5>
            <span className='font-bold'>review count: {recipe?.reviewCount} </span>
          </h5>
          <p className='font-bold' >Rating: {recipe?.rating}</p>
        </div>
      </div>
      
    </div>
    </>
  )
}

export default View