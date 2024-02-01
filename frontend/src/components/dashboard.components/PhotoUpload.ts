import styled from "styled-components";

export const PhotoUpload = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.gray1};
  border-radius: ${(props) => props.theme.radius.base};
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.colors.light};
    transition-duration: 200ms;
  }

  .avatar-abs {
    position: absolute;
    left: 0;
    top: 0;
  }
`;
