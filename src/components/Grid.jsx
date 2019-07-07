import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    padding: 40px 10px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 90vw;
    margin: 0px auto;

    @media only screen and (min-width: 900px) {
        width: 768px;
    }

    @media screen and (min-width: 1200px) {
        width: 1100px;
    }
    
`;