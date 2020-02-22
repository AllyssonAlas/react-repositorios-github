import styled from 'styled-components'

export const Loading = styled.div`
  align-items: center;
  color: rgba(255, 255, 255, 1);
  display: flex;
  font-size: 30px;
  font-weight: bold;
  height: 100vh;
  justify-content: center;
`

export const Owner = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;

  a {
    color: rgba(113, 89, 193, 1);
    font-size: 16px;
    text-decoration: none;
  }

  img {
    border-radius: 50%;
    margin-top: 20px;
    width: 120px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    color: rgba(102, 102, 102, 1);
    font-size: 14px;
    line-height: 1.4;
    margin-top: 5px;
    max-width: 400px;
    text-align: center;
  }

  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    max-height: 40px;
    width: 100%;

    h3 {
      font-size: 18px;
      margin: 20px 0;
    }

    div {
      width: 45%;

      button {
      }
    }
  }
`

export const Button = styled.button.attrs(() => ({
  type: 'button',
}))`
  background-color: ${props => (props.selected ? 'rgba(255, 255, 255, 1)' : 'rgba(113, 89, 193, 1)')};
  border: ${props => (props.selected ? '1px solid rgba(113, 89, 193, 1)' : 'none')};
  border-radius: 2px;
  color: ${props => (props.selected ? 'rgba(113, 89, 193, 1)' : 'rgba(255, 255, 255, 1)')};
  display: inline-block;
  height: 30px;
  margin: 0 10px;
  width: 80px;
`

export const IssueList = styled.ul`
  border-top: 1px solid rgba(238, 238, 238, 1);
  list-style: none;
  margin-top: 30px;
  padding-top: 30px;

  p {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  li {
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 10px;
    }

    img {
      border: 2px solid rgba(238, 238, 238, 1);
      border-radius: 50%;
      height: 36px;
      width: 36px;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          color: #333;
          text-decoration: none;

          &:hover {
            color: rgba(113, 89, 193, 1);
          }
        }
      }

      p {
        color: rgba(153, 153, 153, 1);
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
`
