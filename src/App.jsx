import { useState } from 'react';
import { Box } from '@mui/material';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import BookFormPage from './pages/BookFormPage';

// 라우터 연동 전까지 임시로 state 기반 페이지 전환 사용 (UI 영역만 담당)
function App() {
  const [page, setPage] = useState('list'); // 'list' | 'detail' | 'form'
  const [isEditing, setIsEditing] = useState(false);

  const goList = () => setPage('list');
  const goDetail = () => setPage('detail');
  const goForm = () => {
    setIsEditing(false);
    setPage('form');
  };
  const goEdit = () => {
    setIsEditing(true);
    setPage('form');
  };

  return (
    // index.css의 #root에 text-align:center / width:1126px 가 적용되어 있어
    // 페이지 컴포넌트의 정렬이 깨집니다. 여기서 한번에 오버라이드.
    <Box
      sx={{
        textAlign: 'left',
        width: '100%',
      }}
    >
      {page === 'list' && (
        <BookListPage onAddClick={goForm} onBookClick={goDetail} />
      )}
      {page === 'detail' && (
        <BookDetailPage
          onAddClick={goForm}
          onBackClick={goList}
          onEditClick={goEdit}
          onDeleteClick={goList}
        />
      )}
      {page === 'form' && (
        <BookFormPage
          onAddClick={goForm}
          onBackClick={goList}
          onCancel={goList}
          onSubmit={goDetail}
          onSubmitWithAi={goDetail}
          isEditing={isEditing}
        />
      )}
    </Box>
  );
}

export default App;
