import styled from '@emotion/styled'

export const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    border-color: rgba(241, 242, 244, 1);
    border-top-color: rgba(115, 118, 130, 1);
    width: 32px;
    height: 32px;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
