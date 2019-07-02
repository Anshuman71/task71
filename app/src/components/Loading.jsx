import React from 'react';
import '../App.css';

const Loading = ({ bottom }) => (
    <p className={bottom ? 'loading-bottom' : 'loading'}>Loading ...</p>
);

export default Loading;
