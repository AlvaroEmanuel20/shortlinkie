export default function hiddenOverflowY(isOpen: boolean) {
  const htmlTag = document.querySelector('html');
  const bodyTag = document.querySelector('body');

  if (isOpen) {
    htmlTag ? (htmlTag.style.overflowY = 'hidden') : null;
    bodyTag ? (bodyTag.style.overflowY = 'hidden') : null;
  } else {
    htmlTag ? (htmlTag.style.overflowY = 'visible') : null;
    bodyTag ? (bodyTag.style.overflowY = 'visible') : null;
  }
}
