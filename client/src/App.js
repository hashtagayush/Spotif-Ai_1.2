import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login'
import Dashboard from './dashboard';

const code = new URLSearchParams(window.location.search).get("code")
function App() {
  return code ? <Dashboard code ={code}/> :<Login/>
  
  // return (
  //   // <div className="App">
  //   // </div>
  // );
}


export default App;
