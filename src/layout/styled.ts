import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  margin: 0 auto;
  width: 466px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

  @media screen and (min-width:600px) and (max-width: 900px) {
    width: 587px;
  }
`

export const StyledLayout = styled.div`
  position: relative;
  padding: 0 16px;
  height: 100%;
`
