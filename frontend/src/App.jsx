import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./contexts/ThemeContext"
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import BlogPost from "./components/BlogPost"
import Card from "./components/Card"

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
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-blogs" element={<Card />} />
        <Route path="/blog-post" element={<BlogPost />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App
