import { Overlay, Window } from "./Modal.styled"
import {createPortal} from 'react-dom'
import { Component } from "react";

const modalRoot = document.querySelector('#root-modal');

export class Modal extends Component {
  
  componentDidMount () {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose()
    }
  }

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose()
    }
  }

  render () {
    const img = this.props.img
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Window>
          <img src={img.largeImageURL} alt={img.tags} />
        </Window>
      </Overlay>
      ,modalRoot
    )
  }
  
}

