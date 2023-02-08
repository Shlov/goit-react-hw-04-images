import { Item, Image } from "./ImageGalleryItem.styled"


export const ImageGalleryItem = ({img, onClick}) => {
  return (
    <Item onClick={()  => onClick(img)}>
      <Image src={img.largeImageURL} alt={img.tags} />
    </Item>
  )
}

