import "./App.css";
import NavBar from "./NavBar.js";
import Footer from "./Pages/FooterPage.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.js";
import AboutPage from "./Pages/AboutPage.js";
import ArticlePage from "./Pages/ArticlePage.js";
import ArticlesListPage from "./Pages/ArticlesListPage.js";
import NotFoundPage from "./Pages/NotFoundPage.js";
import LoginPage from "./Pages/LoginPage.js";
import CreateAcctPage from "./Pages/CreateAcctPage.js";

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
