import logo from './logo.svg';
import './App.css';

import Menu from './composants/Menu';
import FormNewPostIt from './composants/FormNewPostIt';
import NotesBoard from './composants/NotesBoard';

function App() {
  return (
    <div>
      <Menu />
      <NotesBoard />
      <FormNewPostIt />
    </div>
  );
}

export default App;
