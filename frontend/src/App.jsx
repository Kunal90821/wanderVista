import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from 'react-router-dom'
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
import UserAccount from './components/user/UserAccount'
import BlogForm from "./components/blogs/BlogForm"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from "./features/auth/authSlice.js"
import Loader from "./components/pages/Loader"

function App() {
  const [themeMode, setThemeMode] = useState('light');

  const lightTheme = () => {
    setThemeMode('light');
  };

  const darkTheme = () => {
    setThemeMode('dark');
  };

  const dispatch = useDispatch()
  const {user, loading, error} = useSelector(state => state.auth)

  useEffect(()=> {
    document.querySelector('html').classList.remove("light","dark");
    document.querySelector('html').classList.add(themeMode);
  },[themeMode]);

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  if(loading) {
    return <Loader />
  }

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={user ? <Navigate to ="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to ="/" /> : <Register />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/my-account" element={user ? <UserAccount /> : <Navigate to ="/login" />}/>
        <Route path="/blog-post" element={user? <BlogPost /> : <Navigate to ="/login" />} />
        <Route path="/create-blog" element={user ? <BlogForm /> : <Navigate to ="/login" />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App
