import { SortType } from '../const';
import AbstractView from '../framework/view/abstract-view';

// $======================== SortView ========================$ //

const createSortItemTemplate = (sortType) => /*html*/`
  <div class="trip-sort__item  trip-sort__item--${sortType}">
    <input
      id="sort-${sortType}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${sortType}"
      ${(sortType === 'offers' || sortType === 'event') ? 'disabled' : ''}
      ${sortType === 'day' ? 'checked' : ''}
      data-sort-type="${sortType}"
    >
    <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
  </div>
`;

const createSortTemplate = () => /*html*/`
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((sortType) => createSortItemTemplate(sortType)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ handleSortTypeChange }) {
    super();
    this.#handleSortTypeChange = handleSortTypeChange;

    this.element.addEventListener('click', this.#onSortTypeChange);
  }

  get template() {
    return createSortTemplate();
  }

  #onSortTypeChange = (e) => {
    if (e.target.tagName !== 'LABEL') {
      return;
    }
    const targetsParentElement = e.target.closest('label').parentElement;
    const nearestInput = targetsParentElement.querySelector('input');
    this.#handleSortTypeChange(nearestInput.dataset.sortType);
  };
}
