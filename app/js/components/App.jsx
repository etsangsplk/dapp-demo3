import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';
import Header from './Header';
import SendForm from './SendForm';
import ProfileBuilderContract from '../../../build/contracts/ProfileBuilder.json';

class App extends Component {
  state = {
    account: '',
    profile: '',
    web3: '',
  }

  componentWillMount() {
    const Profile = contract(ProfileBuilderContract);

    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    this.setState({
      profile: Profile,
      web3,
    });
  }

  componentDidMount() {
    this.start();
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
            <div className="main">
              <Header title="MetaCoin" subtitle="Example Truffle Dapp" />
              <SendForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
