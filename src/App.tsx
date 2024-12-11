import { BrowserRouter, Routes,Route } from 'react-router-dom'
import A from './PageA'
import Book from './books';
import Cart from './cart';
import ABC from './ABC';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BookIcon from '@mui/icons-material/Book';
const NAVIGATION = [
  {
    segment: '',
    title: '首页',
  },
  {
    segment: 'books',
    icon: < BookIcon />,
    title: '书库',
  },
  {
    segment: 'cart',
    icon: <ShoppingCartIcon />,
    title: '购物车',
  },
];
const demoTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={demoTheme}>
      <BrowserRouter>
      <AppProvider 
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://th.bing.com/th/id/OIP.edH-NrzfAXH_yYWNHXhpmQHaHa?rs=1&pid=ImgDetMain" alt="MUI logo" />,
        title: 'Tong_BookStore',
      }}>
      <DashboardLayout>
      <Routes>
        <Route path="/" element={<A />}></Route>
        <Route path="/books" element={<Book />}></Route>
        <Route path="/cart" element={< Cart/>}></Route>
        <Route path="/ABC" element={<ABC />}></Route>
      </Routes>
      </DashboardLayout>
      </AppProvider>
      </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
