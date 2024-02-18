import {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Client from "./Client";
import Menu from "./Menu";
import Home from "./Home";
import './App.css';

class App extends Component {
  state = {
    clients: []
  };

  async componentDidMount() {
    const response = await fetch('api/client/lister');
    const body = await response.json();
    this.setState({clients: body});
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Menu />}>
                  <Route index element={<Home />} />
                  <Route path="liste-client" element={<Client />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </header>
        </div>
    );
  }
}
export default App;
