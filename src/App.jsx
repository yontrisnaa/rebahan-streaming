import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Disclaimer from './pages/Disclaimer';
import Categories from './pages/Categories';
import Category from './pages/Category';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:detailPath?" element={<Detail />} />
        <Route path="/category/:category?" element={<Category />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
