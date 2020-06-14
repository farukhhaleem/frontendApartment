import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
// import CommunityBlog from '../src/components/CommunityBlog'

function App() {
  return (
    <Router>
      <div className= "App">
        {/* <Route exact path='/' component={CommunityBlog} /> */}
        
      </div>
    </Router>
  );
}

export default App;
