export default class Accordion {
  constructor(container) {
    this.containerElement = container;
    this.accordions = [...container.querySelectorAll('.accordion')];

    this.containerElement.addEventListener('click', this.handleClick.bind(this));
    this.containerElement.addEventListener('keydown', this.handleUpDown.bind(this));
  }

  getContentHeight(accordionElement) {
    return accordionElement.querySelector('.accordion-inner').getBoundingClientRect().height;
  }

  isOpen(accordionElement) {
    return accordionElement.classList.contains('is-open');
  }

  open(accordionElement) {
    const accordionHeaderButton = accordionElement.querySelector('button');
    const accordionContent = accordionElement.querySelector('.accordion-content');

    accordionElement.classList.add('is-open');
    accordionHeaderButton.setAttribute('aria-expanded', 'true');
    accordionContent.style.height = `${this.getContentHeight(accordionElement)}px`;
  }

  close(accordionElement) {
    const accordionHeaderButton = accordionElement.querySelector('button');
    const accordionContent = accordionElement.querySelector('.accordion-content');

    accordionElement.classList.remove('is-open');
    accordionHeaderButton.setAttribute('aria-expanded', 'false');
    accordionContent.style.height = 0;
  }

  handleClick(event) {
    const accordionHeader = event.target.closest('.accordion-header');
    if (!accordionHeader) return;

    const accordionElement = accordionHeader.parentElement;

    this.isOpen(accordionElement) ? this.close(accordionElement) : this.open(accordionElement);
  }

  handleUpDown(event) {
    if (!event.target.closest('.accordion-header')) return;

    const { key } = event;
    const accordionElement = event.target.closest('.accordion');
    const index = this.accordions.findIndex((el) => el === accordionElement);

    let targetAccordion;
    if (key === 'ArrowDown') targetAccordion = this.accordions[index + 1];
    if (key === 'ArrowUp') targetAccordion = this.accordions[index - 1];

    if (targetAccordion) {
      targetAccordion.querySelector('button').focus();
    }
  }
}
