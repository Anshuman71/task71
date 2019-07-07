import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingTag = styled.p`
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 100px;
    bottom: 10px;
    left: calc(50vw - 50px);

`;

const Loading = () => (
    <LoadingTag >Loading ...</LoadingTag>
);


const Message = styled.div`
    margin: 0px;
    padding: 0px;
    position:absolute; 
    width: 150px;
    bottom: 10px;
    left: calc(50vw - 75px);
`;

export const EndOfList = () => <Message>~ end of catalogue ~</Message>

export default Loading;
