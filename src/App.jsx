import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Login from './views/Login';
import CardapioYupFormik from './views/CardapioYupFormik';
import Cliente from './views/Cliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cardapio" element={<CardapioYupFormik />} />
          <Route path="login" element={<Login />} />
          <Route path="cliente" element={<Cliente />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
