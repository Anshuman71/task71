import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingTag = styled.p`
    margin: 0px;
    padding: 0px;
    position: ${props => props.bottom ? 'absolute' : 'relative'};
    width: 100px;
    bottom: ${props => props.bottom ? '10px' : '0px'};
    left: ${props => props.bottom ? 'calc(50vw - 50px)' : '0px'};

`;

const Loading = ({ bottom }) => (
    <LoadingTag bottom={bottom}>Loading ...</LoadingTag>
);

export default Loading;
