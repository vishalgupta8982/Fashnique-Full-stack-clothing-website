import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <BrowserRouter >
      <ToastContainer position="top-center" autoClose={4000} draggable />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route index element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;