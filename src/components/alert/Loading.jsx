import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ height, width, color }) => {
  return <Loader type='Oval' color={color} height={height} width={width} />;
};

export default Loading;
