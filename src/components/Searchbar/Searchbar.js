import { useState } from "react";
import toast from 'react-hot-toast';
import { Btn, Form, Header, Input } from "./Searchbar.styled";
import {GiBugNet} from 'react-icons/gi';
import PropTypes from 'prop-types';


export const Searchbar = ({onSubmit}) => {

  const [tagImg, setTagImg] = useState('');

  const handleTagChange = (evnt) => {
    setTagImg(evnt.currentTarget.value.toLowerCase())
  }

  const handleSubmit = (evnt) => {
    evnt.preventDefault()
    if (tagImg.trim() === '') {
      return toast.error('Enter a search query')
    }
    onSubmit(tagImg)
  }

    return (
      <Header>
        <Form onSubmit={handleSubmit}>
          <Btn type="submit">
              <GiBugNet/>
          </Btn>
          <Input
            onChange={handleTagChange}
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </Form>
      </Header>
    )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

