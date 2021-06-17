import React, { Component } from "react";
import { Consumer } from '../../context';
import axios from 'axios';
import TextInputGroup from "../layout/TextInputGroup";



class EditContact extends Component {
  state = {
    fullname: '',
    email: '',
    phone: '',
    errors: {}
  }


  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact = res.data;
    this.setState({
      fullname: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value })


  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    console.log(this.state);
    const { fullname, email, phone } = this.state;
    if(fullname === '') {this.setState({errors: {fullname: 'Name is required'}}); return;};
    if(email === '') {this.setState({errors: {email: 'Email is required'}}); return;};
    if(phone === '') {this.setState({errors: {phone: 'Phone is required'}}); return;};
    const { id } = this.props.match.params;
    const name = fullname;
    const updatedContact = {name, email, phone};
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact);
    dispatch({type: 'UPDATE_CONTACT', payload: res.data});
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
              <div className="card-header"><h1 className="h1 fs-1 lead font-weight-bold"><span className="text-success"> Edit </span>Contact</h1></div>
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

                  <input type="submit" value="Update Contact" className="btn btn-success btn-block" />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}


export default EditContact;
