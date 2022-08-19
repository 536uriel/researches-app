import './App.css';
import HomePage from './components/HomePage';
import Post from './components/Post';
import Posts from './components/Posts';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="App">

      <NavBar/>

      <Routes>
        <Route path='/' exact element={<HomePage/>}></Route>
        <Route path='/post' element={<Post/>}></Route>
        <Route path='/posts' element={<Posts/>}></Route>


      </Routes>
    </div>
    </Router>
  );
}

export default App;
