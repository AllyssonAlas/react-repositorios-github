import styled from 'styled-components'

const Container = styled.div`
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  margin: 80px auto;
  max-width: 700px;
  padding: 30px;

  h1 {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 20px;

    svg {
      margin-right: 10px;
    }
  }
`

export default Container
