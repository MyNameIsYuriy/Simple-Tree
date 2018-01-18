import React from 'react'
import { connect } from 'react-redux'
import { editNode } from '../actions'

function EditNode({ dispatch }) {
  return (
      <button onClick={() => dispatch(editNode())}>
        Edit
      </button>
  )
}

EditNode = connect()(EditNode)
export default EditNode
