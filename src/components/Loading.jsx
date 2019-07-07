import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingTag = styled.p`
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 120px;
    bottom: 10px;
    font-size: 20px;
    left: calc(50vw - 60px);
`;

const Loaders = styled.span`
    animation: extend 1.5s steps(3, end) infinite;
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    &:before {
        content: '...';
    }

    @keyframes extend {
        0% {
            width: 0.25em;
        }
        100% {
            width: 1em;
        }
    }
`;

const Loading = () => (
    <LoadingTag>
        Loading
        <Loaders />{' '}
    </LoadingTag>
);

const Message = styled.div`
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 150px;
    bottom: 10px;
    left: calc(50vw - 75px);
`;

export const EndOfList = () => <Message>~ end of catalogue ~</Message>;

export default Loading;
