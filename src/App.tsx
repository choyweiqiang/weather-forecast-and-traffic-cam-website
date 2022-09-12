import { Header } from "./constants/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
