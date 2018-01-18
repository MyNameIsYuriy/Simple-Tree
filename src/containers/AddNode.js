import React from 'react'
import { connect } from 'react-redux'
import { addNode } from '../actions'

function AddNode({ dispatch }) {
  let input

  return (
    <form onSubmit={e => {
      e.preventDefault()
      if (!input.value.trim() && !input.placeholder) {
        return
      }
      var inputValue = input.value ? input.value : input.placeholder
      dispatch(addNode(inputValue))
      input.value = ''
    }}>
      <input placeholder='new node' ref={node => {
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
