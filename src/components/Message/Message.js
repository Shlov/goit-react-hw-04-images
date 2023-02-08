import { MessageEl } from './Message.styled'

export const Message = ({children}) => {

  return (
    <MessageEl>
      {children}
    </MessageEl>
  )
}