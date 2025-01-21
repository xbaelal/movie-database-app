import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Layout from "./components/Layout";
import { GenresProvider } from "./context/GenresContext";
const App = () => {
  return (
    <GenresProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/details/:type/:id" element={<Details />} />
          </Route>
        </Routes>
      </Router>
    </GenresProvider>
  );
};

export default App;
