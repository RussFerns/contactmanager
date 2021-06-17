import React, { Component } from "react";
import { Consumer } from '../../context';
import axios from 'axios';
import TextInputGroup from "../layout/TextInputGroup";
// import uuid from 'uuid';



class AddContact extends Component {
  state = {
    fullname: '',
    email: '',
    phone: '',
    errors: {}
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value })


  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    console.log(this.state);
    const { fullname, email, phone } = this.state;
    if(fullname === '') {this.setState({errors: {fullname: 'Name is required'}}); return;};
    if(email === '') {this.setState({errors: {email: 'Email is required'}}); return;};
    if(phone === '') {this.setState({errors: {phone: 'Phone is required'}}); return;};
    // const newContact = {id: uuid(), fullname, email, phone}
    const name = fullname;
    const newContact = {name, email, phone};
    const res = await axios.post("https://jsonplaceholder.typicode.com/users", newContact);
    dispatch({type: 'ADD_CONTACT', payload: res.data});
    // axios.post("https://jsonplaceholder.typicode.com/users", newContact)
    //   .then(res => dispatch({type: 'ADD_CONTACT', payload: res.data}));
    // dispatch({type: 'ADD_CONTACT', payload: newContact});
    this.setState({fullname: '', email: '', phone: '', errors: {}});
    this.props.history.push('/');
  }



  render() {
    const { fullname, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return(
            <div className="card mb-3">
              <div className="card-header"><h1 className="h1 lead font-weight-bold"><span className="text-primary"> Add </span>Contact</h1></div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>

                  <TextInputGroup
                    label="Fullname"
                    name="fullname"
                    placeholder="Enter Name..."
                    value={ fullname }
                    onChange={this.onChange}
                    error={errors.fullname}
                   />
                   <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email..."
                    value={ email }
                    onChange={this.onChange}
                    error={errors.email}
                   />
                   <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone..."
                    value={ phone }
                    onChange={this.onChange}
                    error={errors.phone}
                   />

                  <input type="submit" value="Add Contact" className="btn btn-primary btn-block" />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}


export default AddContact;
