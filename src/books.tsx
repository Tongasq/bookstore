import { useQuery } from '@tanstack/react-query';
import { fetchData } from './helper.ts';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

function Book() {
  const { data, isLoading, error } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: () => fetchData('books'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <ul>
      {data?.map((book) => (
        <li key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.price}</p>
        </li>
      ))}
    </ul>
  );
}

export default Book;
