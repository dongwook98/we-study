import { BrowserRouter, Routes, Route } from 'react-router';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import StudyListPage from './pages/StudyList';
import StudyDetailPage from './pages/StudyDetail';
import NotFoundPage from './pages/NotFound';
import StudyCreatePage from './pages/StudyCrete';
import StudyEditPage from './pages/StudyEdit';
import MainLayout from './layouts/MainLayout';
import RequireAuth from './components/shared/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* 공개 페이지 */}
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/study' element={<StudyListPage />} />
          <Route path='/study/:id' element={<StudyDetailPage />} />

          {/* 로그인한 사용자만 접근 가능 페이지 */}
          <Route element={<RequireAuth />}>
            <Route path='/study/new' element={<StudyCreatePage />} />
            <Route path='/study/:id/edit' element={<StudyEditPage />} />
          </Route>
        </Route>

        {/* 404 페이지 */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
