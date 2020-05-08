import React from 'react'
import PropTypes from 'prop-types'

import './RangeForm.css'

const RangeCalories = (props) => (
  <fieldset>
    <legend>Number of minimum calories</legend>
    <p>{props.userCalories}</p>
    <div className="rangeCalories">
      <label htmlFor="calories"></label>
      <input onChange={(e) => props.handleChange(e)} type="range" id="calories" name="calories" min="0" max="100000" step="1000" className="caloriesSlider" />
    </div>
  </fieldset>
)

RangeCalories.propTypes = {
  handleChange: PropTypes.func.isRequired,
  userCalories: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired
  ])
}

export default RangeCalories