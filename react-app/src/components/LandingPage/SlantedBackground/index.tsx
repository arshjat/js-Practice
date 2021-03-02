import './index.css';
import React from 'react';

export default function SlantedBackground({ id }:{id:string}):React.ReactElement {
  return <div id={id} className="slant" />;
}
