import React, { Component } from 'react';
import CardContainer from './CardContainer';

class UserEditForm extends Component {
  state = {
    email: '',
    name: '',
    age: '',
  }

  componentWillReceiveProps(props) {
    if (props.currentUserData.email !== this.props.currentUserData.email ||
      props.currentUserData.name !== this.props.currentUserData.name ||
      props.currentUserData.age !== this.props.currentUserData.age) {
      this.setState({
        name: props.currentUserData.name,
        email: props.currentUserData.email,
        age: props.currentUserData.age,
      });
    }
  }

  onEmailChange = (e) => {
    const { value } = e.target;
    this.setState({ email: value });
  }

  onNameChange = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  }

  onAgeChange = (e) => {
    const { value } = e.target;
    this.setState({ age: value });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.form.reset();

    this.props.onFormSubmit({
      email: this.state.email,
      name: this.state.name,
      age: this.state.age,
    });
  }


  render() {
    return (
      <CardContainer>
        <form ref={(node) => { this.form = node; }} onSubmit={this.onFormSubmit}>
          <h5>Enter your credentials to store in our registry</h5>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Your Email"
              value={this.state.email}
              onChange={this.onEmailChange}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="second_name"
              placeholder="Your Name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Your age"
              min="0"
              max="100"
              value={this.state.age}
              onChange={this.onAgeChange}
            />
          </div>

          <p className="text-right">
            <input className="btn btn-primary" type="submit" value="Submit" />
          </p>
        </form>
      </CardContainer>
    );
  }
}

export default UserEditForm;
