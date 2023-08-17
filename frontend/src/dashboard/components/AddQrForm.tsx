import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Stack } from '../../components/Stack';

export default function AddQrForm() {
  return (
    <form>
      <Stack $spacing={15}>
        <Stack $spacing={5}>
          <Label htmlFor="select">Selecione o link encurtado</Label>
          <Input
            type="text"
            id="select"
            placeholder="Escolha o link para o QR Code"
          />
        </Stack>

        <Button>Gerar</Button>
      </Stack>
    </form>
  );
}
