import styled from "styled-components";

export const Container = styled.div`
  width: 20rem;
  background-color:#2d939c;
  border-radius:0.5rem;
  align-items: center;
  align-content: center;
  display: flex;
  margin: auto;
  margin-top: 12rem;  
  box-shadow: 10px 5px 5px black;
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background-color: #2d939c;
  max-width: 350px;
  padding: 20px;
  border-radius: 5px;
`;

export const Words = styled.p`
  font-size: 200%;
`;