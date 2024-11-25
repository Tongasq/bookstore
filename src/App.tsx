import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import A from './PageA'
import Header from './header';
import Book from './books';
function App() {
  return (
   <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<A />}></Route>
        <Route path="/books" element={<Book />}></Route>
        <Route path="/cart" element={<A />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
