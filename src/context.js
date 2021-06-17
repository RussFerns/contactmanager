import React, { Component } from "react";
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? (contact = action.payload) : contact)
      };
    default:
      return state;
  }
}

export class Provider extends Component {
  state = {
    // contacts: [
    //   {
    //     id: 1,
    //     fullname: "John Doe",
    //     email: "jdoe@email.com",
    //     phone: "555-555-5555",
    //   },
    //   {
    //     id: 2,
    //     fullname: "Karen Doe",
    //     email: "karen@email.com",
    //     phone: "555-555-9999",
    //   },
    //   {
    //     id: 3,
    //     fullname: "Bubby Ferns",
    //     email: "bubby@email.com",
    //     phone: "248-555-5555",
    //   },
    //   {
    //     id: 4,
    //     fullname: "Specky Ferns",
    //     email: "specky@email.com",
    //     phone: "248-777-7777",
    //   },
    //   {
    //     id: 5,
    //     fullname: "D.B Cooper",
    //     email: "dbcooper@email.com",
    //     phone: "827-727-9111",
    //   }
    // ],
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action))
    }
  };




  // componentDidMount() {
  async componentDidMount() {
    console.log("componentDidMount...pre-fetch");
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({contacts: res.data})
    // axios.get("https://jsonplaceholder.typicode.com/users")
    //   .then(res => this.setState({contacts: res.data}));
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => response.json())
    //   .then((data) => {this.setState({contacts: data});});
    console.log("componentDidMount...post-fetch");
  }



  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  };

}

export const Consumer = Context.Consumer;








