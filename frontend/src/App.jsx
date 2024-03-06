import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom'
import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"
import { ThemeProvider } from "./contexts/ThemeContext"
import Home from './components/home/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import BlogPost from "./components/blogs/BlogPost"
import AllBlogs from "./components/blogs/AllBlogs";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register"
import BlogForm from "./components/blogs/BlogForm"

function App() {
  const [themeMode, setThemeMode] = useState('light');

  const lightTheme = () => {
    setThemeMode('light');
  };

  const darkTheme = () => {
    setThemeMode('dark');
  };

  useEffect(()=> {
    document.querySelector('html').classList.remove("light","dark");
    document.querySelector('html').classList.add(themeMode);
  },[themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/blog-post" element={<BlogPost />} />
        <Route path="/create-blog" element={<BlogForm />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App
