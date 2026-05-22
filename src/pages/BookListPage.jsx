import { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../bookService';

function BookListPage({ onChangePage }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      alert('목록 조회 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('삭제하시겠습니까?')) return;
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      alert('삭제 실패');
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div>
      <h2>도서 목록</h2>
      <button onClick={() => onChangePage('create')}>새 도서 등록</button>
      <input 
        type="text" 
        placeholder="검색" 
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>저자: {book.author}</p>
            <button onClick={() => onChangePage('detail', book.id)}>상세</button>
            <button onClick={() => handleDelete(book.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookListPage;