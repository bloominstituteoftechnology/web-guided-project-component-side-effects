import React from 'react';

const Friend = props => {
    return (
        <div className='friend'>
            {props.info.name}
            <button onClick={() => props.openDetails(props.info.id)}>
                See details
            </button>
        </div>
  )
}

export default Friend;