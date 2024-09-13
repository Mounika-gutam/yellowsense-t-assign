import React from 'react'

const BookMarkedContext = React.createContext({
  JobsList: [],
  addBookMark: () => {},
  deleteBookMarkItem: () => {},
})

export default BookMarkedContext;
