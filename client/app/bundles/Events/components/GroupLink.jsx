import React from 'react';

import { Link } from 'react-router-dom';

const GroupLink = ({ group }) => {
  console.log('group', group);
  const { id, attributes } = group.data;

  return(
    <Link to={`/groups/${id}`}>
      <div className='list-group-item'>
        <div className='col-md-1'>
          <span className='badge badge-primary'>Group</span>
        </div>
        <div className='col-md-11'>
          {attributes.name}
        </div>
      </div>
    </Link>
  );
}

export default GroupLink;
