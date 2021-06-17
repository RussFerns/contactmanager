import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Consumer } from '../../context';





class Contact extends Component {

  state = {
    showContactInfo: false
  };

  onShowClick = (e) => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
    console.log(this.state);
  };

  // onDeleteClick = (id, dispatch) => {
  //   console.log('clicked');
  //   console.log(id);
  //   // this.props.deleteClickHandler();
  //   axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
  //     .then(res => dispatch({type: 'DELETE_CONTACT', payload: id}));
  // };


  onDeleteClick = async (id, dispatch) => {
    console.log('clicked');
    console.log(id);
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({type: 'DELETE_CONTACT', payload: id});
  };




  render() {
    const { id, fullname, email, phone } = this.props;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3 py-2">
              <h4>
                {fullname}   
                  <i className="fas fa-sort-down" style={{cursor: 'pointer', paddingLeft: '10px'}} 
                              onClick={this.onShowClick} ></i> 
                  <i className="fas fa-times" style={{cursor: 'pointer', float: 'right', color: 'red'}} 
                              onClick={this.onDeleteClick.bind(this, id, dispatch)}></i>
                  <Link to={`contact/edit/${id}`}> 
                        <i className="fas fa-pencil-alt" style={{cursor: 'pointer', marginRight: '10px', float: 'right', color: 'green'}} >
                        </i> </Link> 
              </h4>
              { showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{phone}</li>
                </ul>
                ) :
                null 
              }
            </div>
          );
        }}
      </Consumer>
    );
  }
}



Contact.propTypes = {
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  // deleteClickHandler: PropTypes.func.isRequired
}



export default Contact;
