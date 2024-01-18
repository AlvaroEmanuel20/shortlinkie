import { ReactNode } from 'react';
import styled from 'styled-components';
import { Stack } from '../Stack';
import { BarChart3, Link, QrCode } from 'lucide-react';

const AuthLayoutStyle = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 49%;
  justify-content: space-between;

  #logo {
    width: 55px;
  }

  #author {
    font-size: ${(props) => props.theme.fontSize.small};

    a {
      font-weight: bold;
      font-size: ${(props) => props.theme.fontSize.small};

      &:hover {
        color: ${(props) => props.theme.colors.blue};
        text-decoration: underline;
      }
    }
  }

  .form-section {
    padding: 8% 14% 25px 14%;
  }

  section {
    background-color: ${(props) => props.theme.colors.blue};
    background-image: url('/auth/shapes.svg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    color: ${(props) => props.theme.colors.light};
    position: relative;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;

    section {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    .form-section {
      padding: 8% 15px;
    }
  }
`;

const Benefits = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: 35%;
  left: 15%;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: ${(props) => props.theme.fontSize.medium};

    &:nth-child(2) {
      margin-left: 15px;
    }

    &:nth-child(3) {
      margin-left: 30px;
    }
  }
`;

export const FormLayout = styled.div`
  p,
  a {
    font-size: ${(props) => props.theme.fontSize.small};
  }

  a {
    font-weight: bold;

    &:hover {
      color: ${(props) => props.theme.colors.blue};
      text-decoration: underline;
    }
  }

  .form-header {
    margin-bottom: 30px;

    h1 {
      font-size: ${(props) => props.theme.fontSize.header1};
      margin-bottom: 5px;
    }
  }
`;

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthLayoutStyle>
      <Stack $justify="space-between" spacing={50} className="form-section">
        <Stack spacing={40}>
          <img id="logo" src="/logo-blue.svg" alt="Logo do Encurtando" />

          {children}
        </Stack>

        <p id="author">
          Feito por{' '}
          <a
            href="https://github.com/AlvaroEmanuel20"
            target="_blank"
            rel="noreferrer"
          >
            Álvaro Emanuel.
          </a>
        </p>
      </Stack>

      <section>
        <Benefits>
          <li>
            <Link size={20} />
            Encurte seus links
          </li>

          <li>
            <QrCode size={20} />
            Gere QR code dos links
          </li>

          <li>
            <BarChart3 size={20} />
            Tenha dados atualizados sobre os links
          </li>
        </Benefits>
      </section>
    </AuthLayoutStyle>
  );
}
