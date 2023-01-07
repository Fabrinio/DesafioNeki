import styled from "styled-components";

export const Container = styled.div`
  width: 40%;
  background-color:#2d939c;
  border-radius:0.5rem;
  align-items: center;
  align-content: center;
  display: flex;
  margin: auto;
  margin-top: 5%;  

  h4{
    text-align: center;
    margin-right: 0.2rem;
  }
`;
export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 50%;
  background-color: #2d939c;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;

  h2{
    margin-right: 4rem;
    
  }

 
`;

export const Image = styled.img`
    width:20%;
    height:20%;
    border-radius:0.2rem;
    margin-right: 10%;
`;

