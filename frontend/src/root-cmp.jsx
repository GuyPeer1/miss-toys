import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AboutUs } from './views/about.jsx';
import { HomePage } from './views/home-page';
import { ToysIndex } from './views/toys-index.jsx';
import { ToysEdit } from './views/toy-edit.jsx';
import { ToysDetails } from './views/toy-details.jsx';
import { AppHeader } from './cmps/app-header.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store';

import './assets/style/main.css'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToysIndex />} path="/toys" />
              <Route element={<ToysEdit />} path="/toys/edit" />
              <Route element={<ToysEdit />} path="/toys/edit/:toyId" />
              <Route element={<ToysDetails />} path="/toys/details/:toyId" />
            </Routes>
          </main>
          {/* <AppFooter /> */}
        </section>
      </Router>
    </Provider>
  )
}
