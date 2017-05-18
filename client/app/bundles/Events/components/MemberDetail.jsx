import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import GroupLink from './GroupLink';
import UpcomingEvent from './UpcomingEvent';
import { fetchMember } from '../actions';

class MemberDetail extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchMember(id)
  }

  renderGroups() {
    const { groups, attributes } = this.props.member;

    if (groups.length)
      return groups.map(group => <GroupLink key={group.data.id} group={group} />)
  }

  renderEvents() {
    const { events, attributes } = this.props.member;

    if (events && events.length)
      return events.map(event => <UpcomingEvent key={event.data.id} event={event.data} />)

    return <div>{`${this.memberFullName(attributes)} hasn't RSVPed any event yet.`}</div>
  }

  memberFullName(attributes) {
    return `${attributes['given-name']} ${attributes['family-name']} `
  }

  render() {
    const { member } = this.props;
    const { groups, attributes } = member;

    if (!attributes)
      return null;

    return (
      <div>
        <h1>{this.memberFullName(attributes)}</h1>
        <a href={`mailto:${attributes['primary-email-address']}`}>
          {attributes['primary-email-address']}
        </a>

        <br />
        <br />

        <div>
          <h4> Groups </h4>
          {this.renderGroups()}
        </div>

        <br />
        <div>
          <h4> Events </h4>
          {this.renderEvents()}
        </div>

        <br/>
        <Link to='/members'>
          <button className='btn btn-primary'>Back to Members</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ member }) => {
  return { member }
};

export default connect(mapStateToProps, { fetchMember })(MemberDetail);
