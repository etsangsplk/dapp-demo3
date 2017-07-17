import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';
import _ from 'lodash';
import UsersList from './UsersList';
import UserEditForm from './UserEditForm';
import ProfileContract from '../../../build/contracts/Profile.json';

class App extends Component {
  state = {
    account: '',
    profile: '',
    web3: '',
    // users: [ // TODO: List of users who changed data
    //   {
    //     address: 'currentUserAddress', // TODO: this is just an example
    //     firstName: 'Alexander',
    //     secondName: 'Pistoletov',
    //     age: '42',
    //   },
    //   {
    //     address: 'sdfsdd', // TODO: this is just an example
    //     firstName: 'Diana',
    //     secondName: 'Shurygina',
    //     age: '18',
    //   },
    // ],
    users: [],
    currentUserAddress: 'currentUserAddress',
    // TODO: Current user who changing information (is it same as state.profile?)
  }

  componentWillMount() {
    const Profile = contract(ProfileContract);

    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    this.setState({
      profile: Profile,
      web3,
    });
  }

  componentDidMount() {
    this.start();
  }

  onFormSubmit = (data) => {
    const { users, currentUserAddress } = this.state;
    const updatedUsers = users;
    const updatedUser = _.findIndex(updatedUsers, user => user.address === currentUserAddress);

    if (updatedUser > -1) {
      updatedUsers[updatedUser] = data;
      this.setState({ users: updatedUsers });
    } else {
      this.setState({ users: [...this.state.users, data] });
    }
  }

  start = () => {
    const { profile, web3 } = this.state;

    profile.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts((err, accs) => {
      if (err !== null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      this.setState({ account: accs[0] });
      this.bootstrap();
    });
  }

  bootstrap = () => {
    const { profile } = this.state;

    profile.deployed()
      .then((instance) => {
        console.log(instance);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md">
            <h1>Dapp!</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <UsersList
              currentUserAddress={this.state.currentUserAddress}
              users={this.state.users}
            />
          </div>
          <div className="col-md-6">
            <UserEditForm
              currentUserAddress={this.state.currentUserAddress}
              onFormSubmit={this.onFormSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
