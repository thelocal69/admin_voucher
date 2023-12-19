import "./App.scss";
import AppRoute from "./routes/AppRoute";
import Header from "./routes/Header";
import React from "react";
import {Container} from 'react-bootstrap';

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoute />
        </Container>
      </div>
    </>
  );
}

export default App;
