import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Nav, NavLink, Navbar, Form, NavDropdown, FormControl, Button} from 'react-bootstrap'
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        <Navbar bg="light" expand="lg">
        <Link to={'/'} className="navbar-brand">LGA App</Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Link to={'/create'} className="nav-link">Create</Link>
    <Link to={'/index'} className="nav-link">Entries</Link>
      <NavDropdown title="Export" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">YAGBA EAS</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">LOKOJA</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">MOPA MORU</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">KABBA-BUNU</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">IJUMU </NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
         
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
