import React, { Component } from "react";

class Test extends Component {
  state = {
    title: ''
    // body: ''
  }
  // UNSAFE_componentWillMount() {
  //   console.log('componentWillMount...')
  // }

  componentDidMount() {
    console.log("componentDidMount...pre-fetch");
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //   .then((response) => response.json())
    //   .then((data) => {console.log(data); this.setState({title: data.title, body: data.body});});
      console.log("componentDidMount...fetched");
  }

  // UNSAFE_componentWillUpdate() {
  //   console.log('componentWillUpdate...')
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate...')
  // }

  // UNSAFE_componentWillReceiveProps(nextProps, nextState) {
  //   console.log('componentWillReceiveProps...')
  // }

  render() {
    const { title } = this.state;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>{title}</h3>
      </div>
    );
  }
}

export default Test;
