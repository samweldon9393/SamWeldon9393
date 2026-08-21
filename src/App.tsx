import { Route, Routes } from 'react-router-dom';
import ScrollToHash from './components/ScrollToHash';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Photos from './pages/Photos';

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
