import CustomBusinessError from './errors/CustomBusinessError';

export default async function imageUrlToBase64(url: string | null | undefined) {
  if (!url) return '';

  try {
    const response = await fetch(url);
    const blob = await response.arrayBuffer();
    const base64String = `data:image/png;base64,${Buffer.from(blob).toString(
      'base64'
    )}`;
    return base64String;
  } catch (err) {
    throw new CustomBusinessError('Image url to base64 failed', 'images');
  }
}
