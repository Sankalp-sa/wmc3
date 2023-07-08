import './App.css'
import { Routes, Route } from "react-router-dom";
import Explore from './components/Explore.jsx';
import Home from './components/Home';
import Books from './components/Elements/Books';
import Characters from './components/Elements/Characters';
import all_data from './animation';
import Species from './components/Elements/Speices';
import RegistrationForm from './Forms/Registration';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div onMouseMove={all_data.myfun00()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/books" element={<Books />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/species" element={<Species />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App