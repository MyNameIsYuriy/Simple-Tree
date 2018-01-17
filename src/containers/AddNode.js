import React from 'react'
import { connect } from 'react-redux'
import { addNode } from '../actions'

function AddNode({ dispatch }) {
  let input

  return (
    <form onSubmit={e => {
      e.preventDefault()
      if (!input.value.trim()) {
        return
      }
      dispatch(addNode(input.value))
      input.value = ''
    }}>
      <input ref={node => {
        input = node
      }} />
      <button type="submit">
        Add
      </button>
    </form>
  )
}
AddNode = connect()(AddNode)
export default AddNode
