import { Component } from "react";
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';
import { Loader } from "components/Loader/Loader"
import { Button } from "components/Button/Button"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImgs } from "js/fetchSearch"
import { Message } from "./Message/Message";

export class App extends Component {
  state = {
    tagImg: null,
    imgs: [],
    status: 'idel',
    page: 1,
    error: null,
    showModal: false,
    showImg: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tagImg !== this.state.tagImg || prevState.page !== this.state.page) {
      this.setState({status: 'pending'})
      fetchImgs(this.state.tagImg, this.state.page)
      .then(imgs => this.setState(prevState => {
        if (!imgs.total) {
          return {status: 'absent'} 
        }
        if (Math.ceil(imgs.totalHits / 12) === this.state.page) {
          return {imgs: [...prevState.imgs, ...imgs.hits], status: 'end'}
        }
        return {imgs: [...prevState.imgs, ...imgs.hits], status: 'resolved'}}))
      .catch(error => this.setState({error, status: 'rejected'}))
    }
  }

  loadMore = () => {
    this.setState(({page}) => {return {page: page+1}})
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({showModal: !showModal}))
    // this.setState(state => ({showModal: !state.showModal}))
  }

  handelFormSubmit = (tagImg) => {
    if (tagImg === this.state.tagImg) {
      return toast.error('Це ми вже знайшли 🙃')
    }
    this.setState({tagImg: tagImg, page: 1, imgs: []})
  }

  openModal = (img) => {
    this.toggleModal()
    this.setState({showImg: img})
  }

  closeModal = () => {
    this.toggleModal()
  }

  render () {

    const {imgs, showModal, status, tagImg, showImg} = this.state

    return (
      <>
        <Searchbar onSubmit = {this.handelFormSubmit}/>
        {imgs && <ImageGallery imgs ={imgs} onOpenModal={this.openModal}/>}
        {showModal && <Modal img = {showImg} onClose = {this.closeModal}/>}
        {status === 'pending' && <Loader />}
        {status === 'resolved' && <Button onClick={this.loadMore}/>}
        {status === 'end' && <Message><h2>Це всі зображення, що знайшли 🙃</h2></Message>}
        {status === 'absent' && <Message><h2>No results found for "{tagImg}".</h2></Message>}
        {status === 'rejected' && <Message><h2>ERROR</h2></Message>}

        <Toaster position="bottom-center"/>
      </>
    );
  }
};

// 'resolved' 'pendingMore' 'idel' 'pendingMore' 'end'
