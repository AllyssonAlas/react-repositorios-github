import styled, { keyframes, css } from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  input {
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    flex: 1;
    font-size: 16px;
    padding: 10px 15px;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const SubmitButton = styled.button.attrs(props => ({
  disabled: props.loading,
  type: 'submit',
}))`
  align-items: center;
  background: rgba(113, 89, 193, 1);
  border: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin-left: 10px;
  padding: 0 15px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `};
`

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0;

    & + li {
      border-top: 1px solid rgba(238, 238, 238, 1);
    }

    a {
      color: rgba(113, 89, 193, 1);
      text-decoration: none;
    }
  }
`
