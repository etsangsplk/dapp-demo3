import React, { Component } from 'react';
import CardContainer from './CardContainer';

class SendForm extends Component {
  state = {
    status: '',
  }

  sendCoin = (e) => {
    e.preventDefault();
    console.log('Test');
  }

  render() {
    return (
      <div>
        <CardContainer>
          <form onSubmit={this.sendCoin}>
            <div className="input-group">
              <label
                className="input-group-addon"
                htmlFor="amount"
              >Amount:</label>

              <input
                className="form-control"
                type="text"
                id="amount"
                placeholder="Example: 95"
              />
            </div>

            <br />

            <div className="input-group">
              <label
                className="input-group-addon"
                htmlFor="receiver"
              >To Address:</label>

              <input
                className="form-control"
                type="text"
                id="receiver"
                placeholder="Example: 0x93e66d9baea28c17d9fc393b53e3fbdd76899dae"
              />
            </div>

            <br />

            <div className="text-center">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={this.sendCoin}
              >Send MetaCoin</button>
            </div>
          </form>
        </CardContainer>

        <br />

        <div className="alert alert-info">
          <b>Status</b>: {this.state.status}
        </div>
      </div>
    );
  }
}

export default SendForm;
