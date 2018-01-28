import React, {Component} from 'react'

export default class AddNode extends Component {
    render() {
        let input
        return (
            <form onSubmit={e => {
              e.preventDefault()
              if (!input.value.trim() && !input.placeholder) {
                return
              }
              var inputValue = input.value ? input.value : input.placeholder
              this.props.onAddBtnClick(inputValue, this.props.selectedNodeId)
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
}