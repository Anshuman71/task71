import styled from 'styled-components';

export default styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-height: 150px;
    padding: 5px;
    flex-wrap: wrap;
    top: 0;
    font-size: 20px;
    z-index: 10;
    color: white;
    position: sticky;
    background-color: rgb(255, 4, 118);

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
`;