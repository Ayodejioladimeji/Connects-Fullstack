import React from 'react';
import './Toast.css';
import { FaTimesCircle } from 'react-icons/fa';

const Toast = ({ msg, handleShow, bgColor, className }) => {
  return (
    <div className={className}>
      <div className='msg_header'>
        <strong className='title'>{msg.title}</strong>
        {msg.title === 'Error' && (
          <FaTimesCircle className='times' onClick={handleShow} />
        )}
      </div>
      <div className='body'>{msg.body}</div>
    </div>
  );
};

export default Toast;
