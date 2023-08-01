import './App.css'
import { Routes, Route } from "react-router-dom";
import Explore from './components/Explore.jsx';
import Home from './components/Home';
import Books from './components/Elements/Books';
import Characters from './components/Elements/Characters';
import all_data from './animation';
import Species from './components/Elements/Speices';
import RegistrationForm from './Forms/Registration';
import { CheckmarkIcon, Toaster } from 'react-hot-toast';
import Login from './Forms/Login';
import Spells from './components/Elements/Spells';
import Wand from './components/Elements/Wand';
import WandDetail from './components/Details/WandDetail';
import CharacterDetail from './components/Details/CharacterDetail.jsx';
import Search from './components/Search';
import Favorite from './components/Favorite';
import PrivateRoute from './Routes/Private';
import SpellsDetails from './components/Details/SpellsDetails';
import HouseQuize from './components/Quizs/HouseQuize';
import CreateCharacter from './components/Admin/CreateCharacter';
import CreateWand from './components/Admin/createWand';

function App() {

  return (
    <div onMouseMove={all_data.myfun00()}>
      <Routes>
        <Route path="/createCharacter" element={<CreateCharacter />} />
        <Route path="/createWand" element={<CreateWand />} />
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/books" element={<Books />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/species" element={<Species />} />
        <Route path="/spells" element={<Spells />} />
        <Route path="/spells/:id" element={<SpellsDetails />} />
        <Route path="/wands" element={<Wand />} />
        <Route path="/wand/:id" element={<WandDetail />} />
        <Route path="/houseQuiz" element={<HouseQuize />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/users" element={<PrivateRoute />} >
          <Route path="favorite" element={<Favorite />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes >
      <Toaster />
    </div>
  )
}

export default App