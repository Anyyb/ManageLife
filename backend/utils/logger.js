//konsoliin tulostuksien moduuli
//logi viestien funktio info
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}
//erroreiden funktio
  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') { 
      console.error(...params)
    }
  }
  
  module.exports = {
    info, error
  }