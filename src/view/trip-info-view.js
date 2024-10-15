import { INFO_DATE_FORMAT } from '../const';
import AbstractView from '../framework/view/abstract-view';
import { getDestinationById, getOffersById, humanizeTime, sortByDay } from '../utils/point';

// $======================== TripInfoView ========================$ //

const createTripInfoTemplate = (points, allDestinations, allOffers) => {
  const sortedPoints = points.sort(sortByDay);
  const firstPoint = sortedPoints[0];
  const middlePoint = sortedPoints[1];
  const lastPoint = sortedPoints[points.length - 1];

  const firstDestination =
    getDestinationById(allDestinations, firstPoint.destination);

  const middleDestination = getDestinationById(allDestinations, middlePoint.destination);

  const lastDestination =
    getDestinationById(allDestinations, lastPoint.destination);

  const startDate = humanizeTime(firstPoint.dateFrom, INFO_DATE_FORMAT);
  const endDate = humanizeTime(lastPoint.dateTo, INFO_DATE_FORMAT);

  let totalCost = 0;

  points.forEach((point) => {
    totalCost += point.basePrice;

    getOffersById(allOffers, point.type, point.offers)
      .forEach((offer) => {
        totalCost += offer.price;
      });
  });

  const middle = sortedPoints.length > 3 ? ' ... ' : `&mdash; ${middleDestination.name} &mdash;`;

  return /*html*/`
    <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${firstDestination.name} ${middle} ${lastDestination.name}</h1>

      <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
    </section>
  `;
};

export default class TripInfoView extends AbstractView {
  #points = [];
  #allOffers = [];
  #allDestinations = [];

  constructor({ points, allDestinations, allOffers }) {
    super();
    this.#points = points;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#allDestinations, this.#allOffers);
  }
}
