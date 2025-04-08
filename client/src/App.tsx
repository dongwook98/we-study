import { BrowserRouter, Route, Routes } from 'react-router';

import HomePage from '@pages/Home';
import LoginPage from '@pages/Login';
import MyPage from '@pages/MyPage';
import NotFoundPage from '@pages/NotFound';
import SignupPage from '@pages/Signup';
import StudyCreatePage from '@pages/StudyCrete';
import StudyDetailPage from '@pages/StudyDetail';
import StudyEditPage from '@pages/StudyEdit';
import StudyListPage from '@pages/StudyList';

import AuthGuard from '@shared/AuthGuard';
import PrivateRoute from '@shared/PrivateRoute';

import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* 공개 페이지 */}
          <Route path='/' element={<HomePage />} />
          <Route path='/study' element={<StudyListPage />} />
          <Route path='/study/:id' element={<StudyDetailPage />} />

          {/* 로그인된 사용자는 접근 불가 */}
          <Route element={<AuthGuard />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Route>

          {/* 로그인한 사용자만 접근 가능 페이지 */}
          <Route element={<PrivateRoute />}>
            <Route path='/my' element={<MyPage />} />
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
