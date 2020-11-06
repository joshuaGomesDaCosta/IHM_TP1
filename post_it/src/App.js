import logo from './logo.svg';
import './App.css';

import Menu from './composants/Menu';
import Page from './composants/Page';
import FormNewPostIt from './composants/FormNewPostIt';

function App() {
  return (
    <div>
      <Menu />
      <Page />
      <FormNewPostIt />
    </div>
  );
}

export default App;
