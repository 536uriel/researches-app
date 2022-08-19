import './App.css';
import HomePage from './components/HomePage';
import Post from './components/Post';
import Posts from './components/Posts';
import MyPosts from './components/MyPosts';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'quill/dist/quill.snow.css'


function App() {
  return (
    <Router>
    <div className="App">

      <NavBar/>

      <Routes>
        <Route path='/' exact element={<HomePage/>}></Route>
        <Route path='/post' element={<Post/>}></Route>
        <Route path='/posts' element={<Posts/>}></Route>
        <Route path='/my-posts' element={<MyPosts/>}></Route>

      </Routes>
    </div>
    </Router>
  );
}

export default App;
