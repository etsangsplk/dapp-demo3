import React, { Component } from 'react';
import contract from 'truffle-contract';
import _ from 'lodash';
import UsersList from './UsersList';
import UserEditForm from './UserEditForm';
import getWeb3 from '../utils/getWeb3';
import ProfileContract from '../../../build/contracts/Profile.json';

class App extends Component {
  state = {
    account: '',
    profile: '',
    web3: '',
    users: [],
    accountAddress: '',
    contractAddress: '',
    // TODO: Current user who changing information (is it same as state.profile?)
  }

  componentWillMount() {
    const Profile = contract(ProfileContract);

    getWeb3
      .then((results) => {
        this.setState({
          web3: results.web3,
          profile: Profile,
          accountAddress: web3.eth.defaultAccount,
        });

        this.initContract();
      });
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

  initContract = () => {
    const { profile, web3 } = this.state;

    profile.setProvider(web3.currentProvider);

    profile.detectNetwork()
      .then(() => {
        this.setState({
          contractAddress: profile.address,
        });
      });

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts((err, accs) => {
      if (err !== null) {
        // alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        // alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
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
          <div className="col-md-8">
            <h1>Community register (Dapp-Demo3)</h1>
          </div>
          <div className="col-md-4">
            <table className="table table-striped table-sm">
              <tbody>
                <tr>
                  <td>Contract</td>
                  <td>{this.state.contractAddress}</td>
                </tr>
                <tr>
                  <td>Account</td>
                  <td>{this.state.accountAddress}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <hr />
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
