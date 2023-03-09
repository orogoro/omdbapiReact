import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { Container, Navigation, Loader } from './';

const Movies = lazy(() => import('../pages/MoviesPage'));
const MovieDetails = lazy(() => import('../pages/MovieDetailsPage'));

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Suspense fallback={<Loader size={70} />}>
          <Routes>
            <Route path='/' element={<Movies />} />
            <Route path=':itemId' element={<MovieDetails />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Suspense>
        <ToastContainer
          position='top-right'
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </Container>
    </>
  );
};

export default App;
