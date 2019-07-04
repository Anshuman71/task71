import React from 'react';

import styled from 'styled-components';

const CardBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 150px;
    min-width: 120px;
    box-shadow: 0px 4px 8px #00000091;
    margin: 10px;
    margin-top: 0px;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
`;

const Face = styled.p`
    font-size: ${props => props.size};
    text-align: center;
    margin: 0px;
`;

const Text = styled.div`
    text-align: center;
    color: ${props => props.price ? 'rgba(255, 4, 118, 0.8)' : '#444'};
    font-weight: ${props => props.price ? 500 : 400};
    margin: 0px;
`;

const Card = ({ emoji: { price, face, date, size } }) => {
    const now = new Date();
    const then = new Date(Date.parse(date));
    let dateText = '';
    const difference = now.getDate() - then.getDate();
    if(difference >= 7 || difference < 0){
        dateText = `Added on ${date.slice(4, 10)}`;
    } else {
        dateText = `Added ${difference} days ago`;
    }
    return (
        <CardBox>
            <Face size={size}>{face}</Face>
            <Text price>${price}</Text>
            <Text>{dateText}</Text>
        </CardBox>
    );
};

export default Card;
