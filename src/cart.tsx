import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Box, Typography } from '@mui/material'; // 导入Modal组件
import React from 'react';
import { Link } from 'react-router-dom';
interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}  
const fetchData=async()=>{
  const response =await fetch('http://localhost:5000/cart');
  if(!response.ok){
    throw new Error('QAQ');
  }
  return response.json();
}
function Cart() {
  const [open, setOpen] = React.useState(false); // 控制Modal显示状态
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null); // 保存选中的书籍
  const queryClient = useQueryClient(); 
  const { data, isLoading, error } = useQuery<Book[]>({
    queryKey: ['cart'],
    queryFn: () => fetchData(),
  });
  if (isLoading) return <div>购物车正在来的路上~</div>;
  if (error) return <div>发生了一点点状况QAQ</div>;
  const handleOpen = (book: Book) => {
    setOpen(true);
    setSelectedBook(book);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };
  const Deletebook = async (book: Book) => {
    const response = await fetch(`http://localhost:5000/cart/${book.id}`, {
        method: 'DELETE'
      });
      await queryClient.invalidateQueries({ queryKey: ['cart'] }); 
      console.log('Book removed from cart.');
      if(!response.ok){
        throw new Error('QAQ');
      }
      return response.json();
    }
const One=data?.map((book)=>book.price);
const Total=(One?.reduce((a, b) => a + b,0))?.toFixed(2)||0;
const Num=One?.length||0;
  return (
    <>
    <div className='cartlist'>
      <p>{Num}本</p>
      <p>总价:{Total}</p>
      <Link to="/ABC">
      <Button variant="contained" onClick={()=>alert(Total+'元')}>购买</Button>
      </Link>
      </div>
    <div className='book-list'>
      {data?.map((book) => (
        <div key={book.id} className='book'>
          <h3 className='book-title' onClick={() => handleOpen(book)}>{book.title}</h3>
          <p className='book-author'>--{book.author}</p>
          <p className='book-price'>{book.price}元</p>
          <Button variant="contained" onClick={() => Deletebook(book)}>移出购物车</Button>
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
export default Cart;
