import { ButtonEl } from "./Button.styled"

export const Button = ({onClick}) => {
  return (
    <ButtonEl type="button" className="Button" onClick={onClick}>
      <span className="Button-label">Load more</span>
    </ButtonEl>
  )
}