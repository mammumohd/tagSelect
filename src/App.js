import logo from './logo.svg';
import './App.css';
import TagSelect from './components/tagSelect/tagSelect';

function App() {

  const items = [
    "asdads","sdfsfd","sadsfsdfsf"
  ];
  
  return (
    <div className="App">
      <header className="App-header">
        <TagSelect 
          id='1'
          width='600px'
          tagItems={items}
        />
      </header>
    </div>
  );
}

export default App;
