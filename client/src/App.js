import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter,
  Route,
  Switch,
  useParams,
  Link
} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/:short'>
          <Short />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function Short() {
  let { short } = useParams();
  useEffect(() => {
    axios
      .get('http://localhost:5000/' + short)
      .then(res => (window.location = res.data));
  });
  return (
    <div className='container'>
      <h3>Loading</h3>
    </div>
  );
}

function Main() {
  const [allLinks, setAllLink] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/links/all')
      .then(res => {
        const allLinks = res.data;
        setAllLink(allLinks);
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <div className='container'>
      <h1 style={{ marginTop: 20 }}>Link Shortner</h1>
      <br />
      <form action='http://localhost:5000/new' method='post'>
        <center>
          <input type='text' placeholder='Link' name='fullLink' /> <br />
          <button>Short URL</button>
        </center>
      </form>
      <div className='results'>
        <center>
          <h3>Saved Links</h3>
          <ul>
            <li key='default' style={{ borderBottom: '2px solid black' }}>
              <div>
                <strong>Link</strong>
              </div>
              <div>
                <strong>Short</strong>
              </div>
              <div>
                <strong>Clicks</strong>
              </div>
            </li>
            {allLinks.map(link => (
              <li key={link.shortLink}>
                <div>{link.fullLink}</div>
                <div>
                  <Link to={link.shortLink}>{link.shortLink}</Link>
                </div>
                <div>{link.clicks}</div>
              </li>
            ))}
          </ul>
        </center>
      </div>
    </div>
  );
}

export default App;
