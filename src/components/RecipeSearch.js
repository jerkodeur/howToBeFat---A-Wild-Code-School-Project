import React, { useState, useEffect } from 'react'
import axios from 'axios'

import DisplaySearchRecipes from './recipeSearch/DisplayResults/DisplaySearchRecipes'
import Form from './recipeSearch/Form/Form'

import './RecipeSearch.css'

const RecipeSearch = () => {

  // API request and Result
  const [numOfResult, setNumOfResult] = useState(0)
  const [errorRequest, setErrorRequest] = useState(false)
  const [recipes, setRecipes] = useState([])
  // Datas from form
  const [userIngredient1, setUserIngredient1] = useState('')
  const [userIngredient2, setUserIngredient2] = useState('')
  const [userIngredient3, setUserIngredient3] = useState('')
  const [userExcludeIngredient1, setUserExcludeIngredient1] = useState('')
  const [userExcludeIngredient2, setUserExcludeIngredient2] = useState('')
  const [userExcludeIngredient3, setUserExcludeIngredient3] = useState('')
  const [userCalories, setUserCalories] = useState(0)
  const [userPreparationTime, setUserPreparationTime] = useState(0)
  const [userDiets, setUserDiets] = useState('')
  const [userIntolerables, setUserIntolerables] =
    useState({
      "peanut-free": false,
      "tree-nut-free": false,
      "alcohol-free": false
    })

  // Display
  const [displayContent, setDisplayContent] = useState('form')

  // Generate a random number
  const getRandomNumber = (max) => Math.floor(Math.random() * Math.floor(max))
  //Define the range of search for the api request
  const defineRangeNumber = (nbResults) => {
    const rangewidth = 100
    const numberToRandom = getRandomNumber(Math.ceil(nbResults / rangewidth))
    const max = (numberToRandom * rangewidth) + rangewidth > nbResults ? nbResults - 1 : (numberToRandom * rangewidth) + rangewidth
    const min = max - rangewidth < 0 ? 0 : max - rangewidth
    return `&from=${min}&to=${max}`
  }

  // Add the optionnal searches to the url request in depend of the users selected options
  const defineRequestUrl = (nbResults) => {
    setNumOfResult(nbResults)
    nbResults = nbResults > 100 ? 100 : nbResults
    const calories = userCalories > 0 ? `&calories=${userCalories}-10000` : ''
    const preparationTime = userPreparationTime ? `&time=1-${userPreparationTime}` : ''
    const ingredients = `${userIngredient1},${userIngredient2},${userIngredient3}`
    const excludes = `&excluded=${userExcludeIngredient1}&excluded=${userExcludeIngredient2}&excluded=${userExcludeIngredient3}`
    // add only the intolerables if its values are true
    const intolerables = Object.entries(userIntolerables)
      .filter(intolerable => intolerable[1])
      .reduce((a, b) => a + `&health=${b[0]}`, '')
    const rangeRequest = nbResults > 0 ? defineRangeNumber(nbResults) : ''

    // url which will be send to the API request
    return `https://api.edamam.com/search?q=${ingredients}${calories}${rangeRequest}${userDiets}${intolerables}${excludes}${preparationTime}&app_id=444702cc&app_key=bc846dfb309ce7532dcc7d629285c733`
  }

  // We verify if the number of results are define
  const callApi = (url) => numOfResult === 0 ? getNumRecipes(url) : getApiDatas(url)
  // If the number of result is unknown, we go fetch it
  const getNumRecipes = (url) => {
    axios.get(url)
      .then((res) => {
        res.data.count === 0 ?
          manageErrors("no recipe") :
          getApiDatas(defineRequestUrl(res.data.count))
      })
      .catch(e => manageErrors("errorRequest1"))
  }
  // Else we fetch the datas
  const getApiDatas = (url) => {
    axios.get(url)
      .then(res => {
        setRecipes(res.data.hits)
        setDisplayContent('recipes')
      })
      .catch(e => manageErrors("errorRequest2"))
  }
  // When the form is validate by the users
  const submitForm = (e) => {
    e.preventDefault()
    !userIngredient1 ? manageErrors("no ingredient")
      : callApi(defineRequestUrl(0))
  }
  // Error display selector
  const manageErrors = (error) => {
    switch (error) {
      case "no recipe":
        setErrorRequest("No recipe found, please modify your choices")
        break
      case "errorRequest1":
        setErrorRequest("Error, please check your ingredients")
        break
      case "errorRequest2":
        setErrorRequest("Too many requests, please try again in few seconds")
        break
      case "no ingredient":
        setErrorRequest("You have to insert at minimum one ingredient to validate the form")
        break
      default:
        setErrorRequest("Please contact the administrator")
        break
    }
  }
  // When an error occured, the errorRequest state re-initialized after 5 secondes
  useEffect(() => {
    setTimeout(() => setErrorRequest(false), 5000)
  }, [errorRequest])

  // Define the state depending of the form element
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase()
    switch (e.target.name) {
      case "ingredient1":
        setUserIngredient1(value)
        break
      case "ingredient2":
        setUserIngredient2(value)
        break
      case "ingredient3":
        setUserIngredient3(value)
        break
      case "excludedIngredient1":
        setUserExcludeIngredient1(value)
        break
      case "excludedIngredient2":
        setUserExcludeIngredient2(value)
        break
      case "excludedIngredient3":
        setUserExcludeIngredient3(value)
        break
      case "calories":
        setUserCalories(e.target.value)
        break
      case "time":
        setUserPreparationTime(e.target.value)
        break
      case "specialDiets":
        setUserDiets(`&health=${e.target.value}`)
        break
      case "intolerables":
        setUserIntolerables({ ...userIntolerables, [value]: e.target.checked })
        break
      default:
    }
  }

  const handleClick = () => {
    setDisplayContent("form")
    setNumOfResult(0)
  }

  const ResData = () => {
    setUserIngredient1('')
    setUserIngredient2('')
    setUserIngredient3('')
    setUserExcludeIngredient1('')
    setUserExcludeIngredient2('')
    setUserExcludeIngredient3('')
    setUserPreparationTime(0)
    setUserCalories(0)
    setUserDiets('')
    setUserIntolerables({
      "peanut-free": false,
      "tree-nut-free": false,
      "alcohol-free": false
    })
  }

  useEffect(() => {
    return () => { ResData() }
  }, [numOfResult])

  return (
    <div className='recipeSearch'>
      <h2 className="mainTitle">CUSTOMIZE YOUR RECIPE</h2>
      {/* Display of the form */
        displayContent === "form" ?
          <>
            <Form handleChange={handleChange} submitForm={submitForm} userCalories={userCalories} userPrepTime={userPreparationTime} errorRequest={errorRequest}
              numOfResult={numOfResult} />
          </>
          :
          <>
            <div className="newSearch" onClick={(e) => handleClick(e)}>New search</div>
            <div className="triangle" onClick={(e) => handleClick(e)}></div>
            <DisplaySearchRecipes recipes={recipes} numOfResult={numOfResult - 1} />
          </>
      }
    </div>
  )
}

export default RecipeSearch
