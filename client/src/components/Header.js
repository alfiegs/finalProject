import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Button, Form, FormControl} from 'react-bootstrap';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 0
    }
    
  }


componentWillMount() {
  let userid = localStorage.getItem("id")
  console.log(userid)
  this.setState({
    userid: userid
  })
}

  render() {
    return (
      <>


        <Navbar bg="dark" expand="lg">
          <Navbar.Brand href="/">What I Did Today</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="What Did You Do Today?" id="basic-nav-dropdown">
                <NavDropdown.Item href="/start">Movie</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Book</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Restaurant</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Recipe</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Event</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Restaurant</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Other</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/test">Friends</Nav.Link>
              <Nav.Link href="/yourfeed">Your Feed</Nav.Link>
            </Nav>
            {/* <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Navbar.Collapse>
        </Navbar>



      {/* <Link to="/">Home</Link> ||
      <Link to="/signup">Sign Up</Link> ||
      <Link to="/signin">Sign In</Link> || 
      <Link to="/signout">Sign Out</Link> ||
      <Link to="/feature">Feature</Link> ||
      <Link to="/page2">Page 2</Link> ||
      <Link to="/start">Start</Link> ||
      <Link to="/test">Friends Feed</Link> ||
      <Link to="/users">Users</Link> ||
      <Link to="/yourfeed">Your Feed</Link> ||
      USER ID: {this.state.userid} */}
    </>
    );
  }
}




export default Header


