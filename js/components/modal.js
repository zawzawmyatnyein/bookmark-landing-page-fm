import trapFocus from '../utilities/trapFocus';
import Focusable from '../utilities/focusable';

export default function Modal({ overlay, openButton }) {
  const overlayElement = overlay;
  const containerElement = overlay.querySelector('.modal');
  const openButtonElement = openButton;
  const closeButtonElement = overlay.querySelector('.modal-close');

  function getSiblingElements() {
    return [...overlayElement.parentElement.children].filter((el) => el !== overlayElement);
  }

  function showSiblingElements() {
    getSiblingElements().forEach((el) => el.removeAttribute('aria-hidden'));
  }

  function hideSiblingElements() {
    getSiblingElements().forEach((el) => el.setAttribute('aria-hidden', 'true'));
  }

  function handleFocus(event) {
    trapFocus(containerElement, event);
  }

  const modal = {
    get isOpen() {
      return overlayElement.classList.contains('open');
    },
    open() {
      overlayElement.classList.remove('close');
      overlayElement.classList.add('open');
      openButtonElement.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleFocus);
      hideSiblingElements();

      const { firstFocusable } = Focusable(containerElement);
      if (firstFocusable) firstFocusable.focus();
    },
    close() {
      overlayElement.classList.remove('open');
      overlayElement.classList.add('close');
      openButtonElement.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleFocus);
      showSiblingElements();

      openButtonElement.focus();
    },
  };

  closeButtonElement.addEventListener('click', () => modal.close());

  overlayElement.addEventListener('click', (event) => {
    if (!event.target.closest('.modal')) modal.close();
  });

  document.addEventListener('keydown', (event) => {
    if (modal.isOpen && event.key === 'Escape') modal.close();
  });

  return modal;
}
