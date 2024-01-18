import { ArrowRight, Copy } from 'lucide-react';
import { Queue } from '../../Queue';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import useCopy from '../../../hooks/dashboard.hooks/useCopy';
import { Input } from '../../Input';
import { useState } from 'react';
import Modal from '../modal.components/Modal';
import { ContentModal } from '../modal.components/ContentModal';
import { FooterModal } from '../modal.components/FooterModal';
import AddSrcInputWrapper from '../AddSrcInput';
import { Button, ButtonOutline } from '../../Button';
import HeaderModal from '../modal.components/HeaderModal';

type TableRowDataProps = {
  shortId: string;
  name: string;
  shortLink: string;
  clicks: number;
};

const TableRowDataStyles = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.colors.gray1};

  td {
    padding: 10px 15px;

    &,
    a,
    .edit-btn {
      font-size: ${(props) => props.theme.fontSize.small};
    }

    a,
    .edit-btn {
      color: ${(props) => props.theme.colors.blue2};
      font-weight: bold;
    }

    button {
      display: flex;
    }
  }

  input {
    &:disabled {
      color: ${(props) => props.theme.colors.blue2};
      font-weight: bold;
    }
  }
`;

export default function TableRowData({
  shortId,
  name,
  shortLink,
  clicks,
}: TableRowDataProps) {
  const theme = useTheme();
  const { inputRef, copyFunc } = useCopy();
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');

  return (
    <>
      <TableRowDataStyles>
        <td>{name}</td>

        <td>
          <Queue spacing={5}>
            {/*copied ? (
              <Check size={15} color={theme.colors.blue2} />
            ) : (
              <button onClick={copyFunc}>
                <Copy size={15} color={theme.colors.blue2} />
              </button>
            )*/}
            <button onClick={() => setIsOpen(true)}>
              <Copy size={15} color={theme.colors.blue2} />
            </button>

            <Input
              ref={inputRef}
              type="text"
              style={{ border: 'none', padding: 0, margin: 0 }}
              value={shortLink}
              $full
              disabled
            />
          </Queue>
          <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
            <HeaderModal text="Copiar link" close={() => setIsOpen(false)} />
            <ContentModal>
              <p style={{ marginBottom: '15px' }}>
                Você deseja adicionar uma origem ao link ou outra no link?
              </p>

              <AddSrcInputWrapper>
                <Input
                  type="text"
                  placeholder="Adicione uma origem"
                  size="small"
                  onChange={(event) => setSrc(event.target.value)}
                  value={src}
                  $full
                />
              </AddSrcInputWrapper>
            </ContentModal>
            <FooterModal>
              <Queue spacing={10}>
                <ButtonOutline
                  onClick={() => setIsOpen(false)}
                  size="small"
                  $bgHover={theme.colors.light}
                >
                  Cancelar
                </ButtonOutline>
                <Button
                  onClick={() => copyFunc(src)}
                  style={{
                    width: '120px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  size="small"
                >
                  Copiar
                </Button>
              </Queue>
            </FooterModal>
          </Modal>
        </td>

        <td>{clicks}</td>

        <td>
          <Link to={`/link/${shortId}`}>
            <Queue className="edit-btn" spacing={4}>
              Editar
              <ArrowRight size={10} color={theme.colors.blue2} />
            </Queue>
          </Link>
        </td>
      </TableRowDataStyles>
    </>
  );
}
