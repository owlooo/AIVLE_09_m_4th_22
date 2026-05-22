import { useState, useEffect } from 'react';
import { getBookById, updateBook } from '../bookService';

function BookEditPage({ bookId, onChangePage }) {
  const [formData, setFormData] = useState({ title: '', author: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookById(bookId);
      setFormData({ title: data.title, author: data.author, content: data.content });
      setIsLoading(false);
    };
    fetchData();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(bookId, formData);
      onChangePage('detail', bookId);
    } catch (error) {
      alert('수정 실패');
    }
  };

  if (isLoading) return <p>로딩 중...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>도서 수정</h2>
      <input name="title" value={formData.title} onChange={handleChange} />
      <input name="author" value={formData.author} onChange={handleChange} />
      <textarea name="content" value={formData.content} onChange={handleChange} />
      <button type="submit">수정 완료</button>
      <button type="button" onClick={() => onChangePage('detail', bookId)}>취소</button>
    </form>
  );
}

export default BookEditPage;