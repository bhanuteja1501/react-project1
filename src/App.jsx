import React, { useState } from 'react';
import './style.css';
import data from './data.json';
import Popup from 'reactjs-popup';

function App() {
  const [name, setName] = useState('');
  const [pswd, setPswd] = useState('');
  const [errmsg, setErrmsg] = useState('');
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  function validate(e) {
    let value = e.target.name;
    if (value === 'uName') {
      setName(e.target.value);
    } else if (value === 'psd') {
      setPswd(e.target.value);
    }
  }
  function submit(event) {
    event.preventDefault();
    var keys = Object.keys(data);
    var uName = keys.filter((key) => {
      return key == name;
    });
    console.log(uName);
    if (uName[0] != undefined && data[uName[0]].password == pswd) {
      console.log('Login success');
    } else {
      if (!uName[0]) {
        setErrmsg('No register user, Please register.');
        setOpen((o) => !o);
      } else {
        setErrmsg('Wrong Password !!!');
        setOpen((o) => !o);
      }
    }
  }

  function register(event) {
    event.preventDefault();
    setErrmsg('Try after sometime');
    if (event.target.attributes.id) {
      setOpen((o) => !o);
    }
  }

  return (
    <div>
      <form className="form" onChange={validate}>
        <p> Hello {name} </p>
        <input
          type="text"
          name="uName"
          placeholder="User Name"
          mandatory="true"
        />
        <input type="text" name="psd" placeholder="Password" />
        <button onClick={submit}>Login</button>
        <button id="frmbtm" className="button" onClick={register}>
          Register
        </button>
      </form>

      <div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <a className="close" onClick={closeModal}>
              &times;
            </a>
            <div className="header"> WARNING </div>
            <div className="content"> {errmsg} </div>
            <button className="button" onClick={register}>
              Register
            </button>
            <button className="button" onClick={closeModal}>
              {' '}
              Close
            </button>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default App;
