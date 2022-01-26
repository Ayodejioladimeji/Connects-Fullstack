import React from 'react';

import { useSelector } from 'react-redux';

import Search from './../search/Search';
import EditProfile from './../editprofile/Edit';
import Tab from './Tab';

const LeftSide = () => {
  const { profile } = useSelector((state) => state);

  return (
    <div>
      {/* THE SEARCH SECTION */}
      <Search />

      {profile.editModal && <EditProfile />}

      <Tab />
    </div>
  );
};

export default LeftSide;
