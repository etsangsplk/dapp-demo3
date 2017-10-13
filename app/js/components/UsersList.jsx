import React, { Component } from 'react';
import CardContainer from './CardContainer';

class UsersList extends Component {
  logUsersChanges = (users) => {
    if (this.props.users.length > 0) {
      return users.map(user =>
        <li
          key={user.address}
          className={(user.address === this.props.accountAddress) ?
            'list-group-item list-group-item-warning' :
            'list-group-item'
          }
          title={(user.address === this.props.accountAddress) ?
            'This is you!' :
            ''
          }
        >
          {`${user.email} ${user.name} - ${user.age} y. o.`} <br />
          <small className="">{user.address}</small>
        </li>,
      );
    } else {
      return (
        <li className="list-group-item list-group-item-danger">
          Nobody has changed their credentials yet
        </li>
      );
    }
  }

  render() {
    console.log(this.props.userCount);
    return (
      <CardContainer>
        <h4>Total: {this.props.userCount.toString()}</h4>
        <ul className="list-group">
          {this.logUsersChanges(this.props.users)}
        </ul>
      </CardContainer>
    );
  }
}

export default UsersList;
