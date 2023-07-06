import './App.css'
import { Routes, Route } from "react-router-dom";
import Explore from './components/Explore.jsx';
import Home from './components/Home';
import Books from './components/Elements/Books';
import Characters from './components/Elements/Characters';
import all_data from './animation';
import Species from './components/Elements/Speices';

function App() {

  return (
    <div onMouseMove={all_data.myfun00()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/books" element={<Books />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/species" element={<Species />} />
      </Routes>
    </div>
  )
}

export default App