import React from 'react'
import { connect } from 'react-redux'
import { removeNode } from '../actions'

function DeleteNode({ dispatch }) {
  return (
      <button onClick={() => dispatch(removeNode())}>
        Delete
      </button>
  )
}

DeleteNode = connect()(DeleteNode)
export default DeleteNode
