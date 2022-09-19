import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import {MainPage, ComicsPage} from '../pages'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <AppHeader />

        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
