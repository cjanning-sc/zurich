import SearchPage from './zurich/Search';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {
  GlobalStyle
} from "./styled";
import { setConfigData } from './utils/siteUtils';

function App() {
  setConfigData();

  return (
    <Router>
      <GlobalStyle />
      <div className='App'>
        <Routes>
          <Route path="/" exact element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
