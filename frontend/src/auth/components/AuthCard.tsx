import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { Stack } from '../../components/Stack';
import { HStack } from '../../components/HStack';
import { RouterLinkStyled } from '../../components/LinkStyled';

const AuthCardStyle = styled.div`
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: ${(props) => props.theme.radius.md};
  padding: 30px;
  min-width: 340px;

  h1 {
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

interface AuthCard {
  title: string;
  children: ReactNode;
  linkText: string;
  linkTo: string;
}

export default function AuthCard({
  title,
  children,
  linkText,
  linkTo,
}: AuthCard) {
  return (
    <AuthCardStyle>
      <Stack $spacing={20}>
        <HStack $justify="space-between">
          <h1>{title}</h1>

          <RouterLinkStyled to={linkTo}>{linkText}</RouterLinkStyled>
        </HStack>

        {children}
      </Stack>
    </AuthCardStyle>
  );
}
