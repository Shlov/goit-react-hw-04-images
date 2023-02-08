import {Rings} from 'react-loader-spinner';


export const Loader = () => {
  return (
    <Rings
      height="180"
      width="180"
      color="#4fa94d"
      radius="6"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="rings-loading"
    />
  )
}