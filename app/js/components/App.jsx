import React, { Component } from 'react';
import contract from 'truffle-contract';
import async from 'async';
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
    userCount: 0,
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
    const { profile, web3 } = this.state;


    // const { users, currentUserAddress } = this.state;
    // const updatedUsers = users;
    // const updatedUser = _.findIndex(updatedUsers, user => user.address === currentUserAddress);

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
    profile.defaults({ from: web3.eth.coinbase });


    // profile.detectNetwork()
    //   .then(() => {
    //
    //   });

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

  updateUserCount = () => {
    const { profile } = this.state;

    profile.deployed()
      .then((instance) => {
        instance.getUserCount()
          .then((count) => {
            this.setState({
              userCount: count,
            });
          });
      });
  }

  setUserCredentials = () => {
    const { profile } = this.state;

    profile.deployed()
      .then((instance) => {
        instance.setUser('nikita@chebyk.in', 'Nikita', 29)
          .then((smth) => {
            console.log(smth);
            // instance.getUser
            this.updateUserCount();
          });
      });
  }

  // Read-expensive operation
  loadUsersList = () => {
    const { profile } = this.state;
    let instance;

    profile.deployed()
      .then((ins) => {
        instance = ins;
        return instance.getUserCount();
      })
      .then((count) => {
        console.log('loading', count, 'times');
        return new Promise((resolve, reject) => {
          async.times(count.toNumber(), (n, next) => {
            instance.getUserAtIndex(n)
              .then((address) => {
                next(null, address);
              });
          }, (err, addresses) => {
            if (err) {
              return reject(err);
            }

            return resolve(addresses);
          });
        });
      })
      .then((addresses) => {
        console.log('addresses', addresses);
        async.map(addresses, (address, next) => {
          this.getUserCredentials(address)
            .then((user) => {
              next(null, user);
            })
            .catch(err => next(err));
        }, (err, mappedUsers) => {
          if (err) {
            console.error(err);
          }

          console.log('users', mappedUsers);
          this.setState({
            users: mappedUsers,
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserCredentials = (address) => {
    const { profile, web3 } = this.state;

    return new Promise((resolve, reject) => {
      profile.deployed()
        .then((instance) => {
          instance.getUser(address)
            .then((smth) => {
              resolve({
                email: web3.toUtf8(smth[0]),
                name: web3.toUtf8(smth[1]),
                age: smth[2],
                address,
              });

              console.log(smth);
            });
        });
    });
  }

  bootstrap = () => {
    const { profile } = this.state;

    profile.deployed()
      .then((instance) => {
        this.setState({
          contractAddress: instance.address,
        });

        this.updateUserCount();
        this.loadUsersList();
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
            <h1>Community registry (Dapp-Demo3)</h1>
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
          <button onClick={this.setUserCredentials}>Set Credentials</button>
          <button onClick={this.getUserCredentials}>Get Credentials</button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <UsersList
              currentUserAddress={this.state.currentUserAddress}
              users={this.state.users}
              userCount={this.state.userCount}
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
