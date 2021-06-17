import React, { Component } from "react";
import Contact from './Contact';
import { Consumer } from '../../context';




class Contacts extends Component {


  // constructor() {
  //   super();
  //   this.state = {
  //     contacts: [
  //       {
  //         id: 1,
  //         fullname: "John Doe",
  //         email: "jdoe@email.com",
  //         phone: "555-555-5555"
  //       },
  //       {
  //         id: 2,
  //         fullname: "Jane Doe",
  //         email: "jndoe@email.com",
  //         phone: "555-555-9999"
  //       },
  //       {
  //         id: 3,
  //         fullname: "Bubby Ferns",
  //         email: "bubby@email.com",
  //         phone: "248-555-5555"
  //       },
  //       {
  //         id: 4,
  //         fullname: "Specky Ferns",
  //         email: "specky@email.com",
  //         phone: "248-777-7777"
  //       }
  //     ]
  //   }
  // };

  // deleteContact = (id) => {
  //   console.log(id);
  //   const { contacts } = this.state;
  //   const newContacts = contacts.filter(contact => contact.id !== id);
  //   this.setState({
  //     contacts: newContacts
  //   });
  // };


  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment> 
              <h1 className="display-4 mb-2"><span className="text-danger">Contact</span> List</h1>
              {contacts.map(contact => 
                <Contact 
                    key={contact.id}
                    id={contact.id}
                    fullname={contact.name}
                    email={contact.email}
                    phone={contact.phone}
                    // deleteClickHandler={this.deleteContact.bind(this, contact.id)}
                />
              )}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
