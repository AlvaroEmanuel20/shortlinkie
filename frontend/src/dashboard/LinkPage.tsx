import { useParams } from 'react-router-dom';

export default function LinkPage() {
  const { shortId } = useParams();

  return (
    <>
      <h1>Link page - {shortId}</h1>
    </>
  );
}
