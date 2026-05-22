import { useState } from 'react';
import { createBook } from '../bookService';

function BookCreatePage({ onChangePage }) {
  const [formData, setFormData] = useState({ title: '', author: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBook(formData);
      onChangePage('list');
    } catch (error) {
      alert('등록 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>도서 등록</h2>
      <input name="title" onChange={handleChange} placeholder="제목" required />
      <input name="author" onChange={handleChange} placeholder="저자" required />
      <textarea name="content" onChange={handleChange} placeholder="본문" required />
      <button type="submit">등록</button>
      <button type="button" onClick={() => onChangePage('list')}>취소</button>
    </form>
  );
}

export default BookCreatePage;