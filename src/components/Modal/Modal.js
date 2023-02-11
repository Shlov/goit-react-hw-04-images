import { Overlay, Window } from "./Modal.styled";
import {createPortal} from 'react-dom';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root-modal');

export const Modal = ({img, onClose}) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {window.removeEventListener('keydown', handleKeyDown)}
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose()
    }
  }

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Window>
        <img src={img.largeImageURL} alt={img.tags} />
      </Window>
    </Overlay>
    ,modalRoot
  )
}

Modal.propTypes = {
  img: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
}

