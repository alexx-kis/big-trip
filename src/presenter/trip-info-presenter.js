import TripInfoView from '../view/trip-info-view';
import { render, replace, remove, RenderPosition } from '../framework/render';

// $======================== TripInfoPresenter ========================$ //

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #headerContainer = null;
  #pointsModel = null;

  // @------------ CONSTRUCTOR ------------@ //
  constructor({ headerContainer, pointsModel }) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  // @------------ GETTERS ------------@ //
  get points() {
    return this.#pointsModel.points;
  }

  // @------------ INIT ------------@ //
  init() {
    if (!this.#pointsModel.isLoaded) {
      return;
    }

    const prevTripInfoComponent = this.#tripInfoComponent;

    if (this.#pointsModel.points.length === 0) {
      this.#tripInfoComponent = null;
      remove(prevTripInfoComponent);
      return;
    }

    this.#tripInfoComponent = new TripInfoView({
      points: this.points,
      allOffers: this.#pointsModel.offers,
      allDestinations: this.#pointsModel.destinations,
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  // @------------ HANDLERS ------------@ //
  #handleModelEvent = () => {
    this.init();
  };
}
