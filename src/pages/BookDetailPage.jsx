import { useState, useEffect } from 'react';
import { getBookById } from '../bookService';

function BookDetailPage({ bookId, onChangePage }) {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(bookId);
        setBook(data);
      } catch (error) {
        alert('도서 상세 조회 실패');
        onChangePage('list');
      } finally {
        setIsLoading(false);
      }
    };
    if (bookId) fetchBook();
  }, [bookId, onChangePage]);

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <div>
      <button onClick={() => onChangePage('list')}>목록으로</button>
      
      <h2>{book.title}</h2>
      <p>저자: {book.author}</p>
      <p>{book.content}</p>

      {/* 나중에 AI 이미지 표시될 자리 */}
      {book.coverImageUrl && <img src={book.coverImageUrl} alt="표지" />}
      
      <button onClick={() => onChangePage('edit', book.id)}>수정</button>
    </div>
  );
}

export default BookDetailPage;