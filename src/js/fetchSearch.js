
const KEY = '31737650-012dbd0b1d73fc9a5bf6ca0f4';

export function fetchImgs (tag ,page) {
  return fetch(`https://pixabay.com/api/?q=${tag}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(res.status))
  })
}