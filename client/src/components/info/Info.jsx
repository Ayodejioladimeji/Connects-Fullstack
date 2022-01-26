import React, { useState, useEffect } from 'react';

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [setOnEdit] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  return (
    <div className='info'>
      {userData.map((user) => (
        <div className='info_container' key={user._id}>
          <img
            src={user.avatar}
            alt='avatar'
            size='supper-avatar'
            style={{ width: '80px', height: '80px', borderRadius: '50%' }}
          />

          <div className='info_content'>
            <div className='info_content_title'>
              <h2>{user.username}</h2>
              {user._id === auth.user._id && (
                <button
                  className='btn btn-outline-info'
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            <h6>
              {user.fullname} <span className='text-danger'>{user.mobile}</span>
            </h6>
            <p className='m-0'>{user.address}</p>
            <h6 className='m-0'>{user.email}</h6>
            <a href={user.website} target='_blank' rel='noreferrer'>
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>

          {/* {onEdit && <EditProfile setOnEdit={setOnEdit} />} */}
        </div>
      ))}
    </div>
  );
};

export default Info;
