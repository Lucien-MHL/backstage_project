export const toArray = (obj) => Object.values(!obj.current ? obj : obj.current)
export const selectInput = (arr) => arr.filter((e) => e.localName === 'input')
export const setObject = (arr) =>
  arr.reduce((obj, e) => ({ ...obj, [e.name]: e.value }), {})
export const setFileObj = (arr) =>
  arr.reduce((obj, e) => ({ ...obj, [e.name]: e.files[0] }), {})
