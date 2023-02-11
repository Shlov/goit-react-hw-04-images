import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';
import { Loader } from "components/Loader/Loader"
import { Button } from "components/Button/Button"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImgs } from "js/fetchSearch"
import { Message } from "./Message/Message";

export const App = () => {
  const [tagImg, setTagImg] = useState('');
  const [imgs, setImgs] = useState([]);
  const [status, setStatus] = useState('idel');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImg, setShowImg] = useState(null);

  useEffect(() => {
    if (tagImg === '') {
      return
    }
    setStatus('pending');
    fetchImgs(tagImg, page)
    .then(imgs =>  {
      if (!imgs.total) {
        return setStatus('absent')
      }
      setImgs(state => [...state, ...imgs.hits])
      setStatus( Math.ceil(imgs.totalHits / 12) === page ? 'end' : 'resolved')
      })
    .catch(error => {
      setError(error);
      setStatus('rejected')}
    )
  }, [tagImg, page])

  const loadMore = () => {
    setPage(state => state + 1)
  }

  const toggleModal = () => {
    setShowModal(state => !state)
  }

  const handelFormSubmit = (newTagImg) => {
    if (newTagImg === tagImg) {
      return toast.error('Це ми вже знайшли 🙃')
    }
    setTagImg(newTagImg)
    setPage(1)
    setImgs([])
  }

  const openModal = (img) => {
    toggleModal()
    setShowImg(img)
  }

  const closeModal = () => {
    toggleModal()
  }

  return (
    <>
      <Searchbar onSubmit = {handelFormSubmit}/>
      {imgs && <ImageGallery imgs ={imgs} onOpenModal={openModal}/>}
      {showModal && <Modal img = {showImg} onClose = {closeModal}/>}
      {status === 'idel' && <Message><h2>Підскажіть, що ви хочете знайти 🙃</h2></Message>}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button onClick={loadMore}/>}
      {status === 'end' && <Message><h2>Це всі зображення, що знайшли 🙃</h2></Message>}
      {status === 'absent' && <Message><h2>No results found for "{tagImg}".</h2></Message>}
      {status === 'rejected' && <Message><h2>ERROR {console.log(error)}</h2></Message>}

      <Toaster position="bottom-center"/>
    </>
  );
};

// 'idel' 'resolved' 'pending' 'end' 'absent' 'rejected'
