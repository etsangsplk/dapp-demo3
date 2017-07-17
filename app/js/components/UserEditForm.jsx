import React, { Component } from 'react';
import CardContainer from './CardContainer';

class UserEditForm extends Component {
  state = {
    firstName: '',
    secondName: '',
    age: '',
  }

  onFirstNameChange = (e) => {
    const { value } = e.target;
    this.setState({ firstName: value });
  }

  onSecondNameChange = (e) => {
    const { value } = e.target;
    this.setState({ secondName: value });
  }

  onAgeChange = (e) => {
    const { value } = e.target;
    this.setState({ age: value });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.form.reset();

    const data = {
      address: this.props.currentUserAddress,
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      age: this.state.age,
    };

    this.props.onFormSubmit(data);
  }

  render() {
    return (
      <CardContainer>
        <form ref={(node) => { this.form = node; }} onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">Enter your first name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Alexander"
              onChange={this.onFirstNameChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="second_name">Enter your second name</label>
            <input
              type="text"
              className="form-control"
              id="second_name"
              placeholder="Pistoletov"
              onChange={this.onSecondNameChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Enter your age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="42"
              min="0"
              max="100"
              onChange={this.onAgeChange}
              required
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
