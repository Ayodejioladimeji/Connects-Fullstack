import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

import Loading from './Loading';
import Toast from './Toast';

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '50',
  };

  return (
    <div>
      {alert.loading && (
        <div style={styles}>
          <Loading width='45px' height='45px' color='blue' />
        </div>
      )}

      {alert.error && (
        <Toast
          msg={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          className='errMsg'
        />
      )}

      {alert.success && (
        <Toast
          msg={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          className='successMsg'
        />
      )}
    </div>
  );
};

export default Alert;
