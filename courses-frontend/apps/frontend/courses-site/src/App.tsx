import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import Layout from './views/Layout';
import PageNotFound from './views/PageNotFound';
import CourseListView from './views/CourseListView';
import CourseCreateView from './views/CourseCreateView';
import CourseDetailView from './views/CourseDetailView';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="courses" element={<CourseListView />} />
          <Route path="courses/add" element={<CourseCreateView />} />
          <Route path="courses/details/:uuid" element={<CourseDetailView />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
