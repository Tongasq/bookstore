import { useQuery } from '@tanstack/react-query';
import { Button, Modal, Box, Typography } from '@mui/material'; // 导入Modal组件
import './book.css';
import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}  
const fetchData=async()=>{
  const response =await fetch('http://localhost:5000/books');
  if(!response.ok){
    throw new Error('QAQ');
  }
  return response.json();
}

function Book() {
  const [open, setOpen] = React.useState(false); // 控制Modal显示状态
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null); // 保存选中的书籍
  const { data, isLoading, error } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () => fetchData(),
  });
  if (isLoading) return <div>书本正在来的路上~</div>;
  if (error) return <div>发生了一点点状况QAQ</div>;
  
  
  const handleOpen = (book: Book) => {
    setOpen(true);
    setSelectedBook(book);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };
  const addToCart = async (book:Book) => {
    let ID = book.id;
    let Title = book.title;
    let Author = book.author;
    let Price = book.price;
    const response = await fetch(`http://localhost:5000/cart/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:ID,title:Title,author:Author,price:Price}) 
    })
    if(!response.ok){
      throw new Error('QAQ');
    }
    return response.json();
  };
  return (
    <>
    <div className='book-list'>
      {data?.map((book) => (
        <div key={book.id} className='book'>
          <h3 className='book-title' onClick={() => handleOpen(book)}>{book.title}</h3>
          <p className='book-author'>--{book.author}</p>
          <p className='book-price'>{book.price}元</p>
          <Button variant="contained" onClick={() => addToCart(book)}>加入购物车</Button>
        </div>
      ))}
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          {selectedBook && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedBook.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                作者：{selectedBook.author}<br/>
                价格：{selectedBook.price}元<br/>
                简介：{selectedBook.title}是一本好书，由{selectedBook.author}所著，价格{selectedBook.price}元。
              </Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }}>关闭</Button>
            </>
          )}
        </Box>
      </Modal>
   </>
    
  );}
export default Book;
