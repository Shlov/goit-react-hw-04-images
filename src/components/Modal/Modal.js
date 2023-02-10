import { Overlay, Window } from "./Modal.styled";
import {createPortal} from 'react-dom';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root-modal');

export const Modal = ({img, onClose}) => {
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {window.removeEventListener('keydown', handleKeyDown)}
  }, [])

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }

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



// export class Modal extends Component {
  
//   componentDidMount () {
//     window.addEventListener('keydown', this.handleKeyDown)
//   }

//   componentWillUnmount () {
//     window.removeEventListener('keydown', this.handleKeyDown)
//   }

//   handleKeyDown = (e) => {
//     if (e.code === 'Escape') {
//       this.props.onClose()
//     }
//   }

//   handleBackdropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose()
//     }
//   }

//   render () {
//     const img = this.props.img
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <Window>
//           <img src={img.largeImageURL} alt={img.tags} />
//         </Window>
//       </Overlay>
//       ,modalRoot
//     )
//   }
  
// }

