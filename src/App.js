import "./App.css";
import NavBar from "./NavBar";
import Footer from "./Pages/FooterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ArticlePage from "./Pages/ArticlePage";
import ArticlesListPage from "./Pages/ArticlesListPage";
import NotFoundPage from "./Pages/NotFoundPage";
import LoginPage from "./Pages/LoginPage";
import CreateAcctPage from "./Pages/CreateAcctPage";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/articles" element={<ArticlesListPage />} />
            <Route path="/articles/:articleId" element={<ArticlePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="create-account" element={<CreateAcctPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer /> 
      </div>
    </BrowserRouter>
  );
}

export default App;
