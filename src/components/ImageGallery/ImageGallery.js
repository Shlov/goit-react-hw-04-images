import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { ImageGalleryEl } from './ImageGallery.styled'


export const ImageGallery = ({imgs, onOpenModal}) => {

  return (
    <>
      <ImageGalleryEl>
        {imgs.map(img => <ImageGalleryItem img={img} onClick={onOpenModal}  key={img.id}/>)}
      </ImageGalleryEl>
    </>
  )
}


