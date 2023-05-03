import SearchPage from './pages/jobdiscovery/Search';
import ArticlePage from './pages/article/Article';
import AffinityScorecard from './components/AffinityScorecard';

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
          <Route path="/:id" element={<ArticlePage />} />
        </Routes>
      </div>
      <AffinityScorecard />
    </Router>
  );
}

export default App;
