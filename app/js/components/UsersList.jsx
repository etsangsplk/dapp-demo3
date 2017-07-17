import React, { Component } from 'react';
import CardContainer from './CardContainer';

class UsersList extends Component {
  logUsersChanges = (users) => {
    if (this.props.users.length > 0) {
      return users.map(user =>
        <li
          key={user.address}
          className={(user.address === this.props.currentUserAddress) ?
            'list-group-item list-group-item-warning' :
            'list-group-item'
          }
          title={(user.address === this.props.currentUserAddress) ?
            'This is you!' :
            ''
          }
        >
          {`${user.firstName} ${user.secondName} - ${user.age} y. o.`}
        </li>,
      );
    } else {
      return (
        <li className="list-group-item list-group-item-danger">
          Nobody has changed their cridentials yet
        </li>
      );
    }
  }

  render() {
    return (
      <CardContainer>
        <ul className="list-group">
          {this.logUsersChanges(this.props.users)}
        </ul>
      </CardContainer>
    );
  }
}

export default UsersList;
