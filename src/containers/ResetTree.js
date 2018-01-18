import React from 'react'
import { connect } from 'react-redux'
import { resetTree } from '../actions'

function ResetTree({ dispatch }) {
  return (
      <button onClick={() => dispatch(resetTree())}>
        Reset
      </button>
  )
}

ResetTree = connect()(ResetTree)
export default ResetTree
