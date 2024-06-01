import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './views/Main';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import CarouselQuestionForm from './views/questions';
import AsanaRoutine from './views/AsanaRoutine';
import Dashboard from './views/Dashboard';
import Navbar from './components/Navbar';
import Admin from './views/Admin';
import Demo from './views/demo';
import Contact from './views/Contact'; // Ensure correct file name and casing
import About from './views/About'; // Ensure correct file name and casing
import VideoPlayerPage from './views/playVideo';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/questions" element={<CarouselQuestionForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/asanaroutine" element={<AsanaRoutine />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/videoplayer" element={<VideoPlayerPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
