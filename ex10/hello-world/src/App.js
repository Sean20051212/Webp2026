import logo from './logo.svg';
import './App.css';

const changeText = (event) => {
  console.log(event.target);
  event.target.innerText = event.target.innerText + "被點了";
};

const styleArgument = {
  color: "white",
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={styleArgument} onClick={changeText}>
          hello CGU!!
        </h1>
      </header>
    </div>
  );
}

export default App;