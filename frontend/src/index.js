import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Navigation, Footer, ViewBlog, ViewIndividualBlog, Blog, BlogPlaceholder} from "./components";

ReactDOM.render(

      <Router>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/blogs" element={<BlogPlaceholder />}>
                  <Route path="" element={<ViewBlog />} />
                  <Route path=":postSlug" element={<ViewIndividualBlog />} />
              </Route>
              <Route path="/new-story" element={<Blog />} />
          </Routes>
      </Router>,

  document.getElementById('root')
);
