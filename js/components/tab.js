export default class Tab {
  #containerElement;
  #tabsList;
  #tabs;
  #tabPanels;

  constructor(container) {
    this.#containerElement = container;
    this.#tabsList = container.querySelector('[role="tablist"]');
    this.#tabs = [...container.querySelectorAll('[role="tab"]')];
    this.#tabPanels = [...container.querySelectorAll('[role="tabpanel"]')];

    this.#tabsList.addEventListener('click', this.#handleClick);
    this.#tabsList.addEventListener('keydown', this.#handleLeftRight.bind(this));
  }

  #getTabpanel(id) {
    return this.#containerElement.querySelector(id);
  }

  #selectTab(tab) {
    const target = tab.dataset.target;
    const tabPanel = this.#getTabpanel(target);

    this.#tabs.forEach((t) => {
      t.removeAttribute('aria-selected');
      t.setAttribute('tabindex', '-1');
    });
    tab.setAttribute('aria-selected', 'true');
    tab.removeAttribute('tabindex');

    this.#tabPanels.forEach((p) => p.classList.add('hidden'));
    tabPanel.classList.remove('hidden');
  }

  #getPreviousTab(index) {
    if (index !== 0) return this.#tabs[index - 1];
  }

  #getNextTab(index) {
    if (index !== this.#tabs.length - 1) return this.#tabs[index + 1];
  }

  #handleClick = (event) => {
    if (!event.target.matches('button')) return;

    this.#selectTab(event.target);
  };

  #handleLeftRight(event) {
    const { key } = event;
    if (key !== 'ArrowLeft' && key !== 'ArrowRight') return;

    const index = this.#tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');

    let targetTab;
    if (key === 'ArrowLeft') targetTab = this.#getPreviousTab(index);
    if (key === 'ArrowRight') targetTab = this.#getNextTab(index);

    if (targetTab) {
      targetTab.click();
      targetTab.focus();
    }
  }
}
