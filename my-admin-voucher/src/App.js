import './App.scss';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import TableProducts from './components/TableProducts';

function App() {
  return (
    <div className='app-container'>
      <Header />
      <Container>
        <TableProducts />
      </Container>
    </div>
  );
}

export default App;
