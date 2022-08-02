import styled from '@emotion/styled'

export const StyledUserCard = styled.div`
  position: relative;
  .user-card {
    &__name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: calc(100% - 36px);
    }
  }
`
export const StyledUserCardButton = styled.div`
  position: absolute;
  right: 4px;
  top: 0.5rem;
`
