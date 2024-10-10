import ApiService from './framework/api-service';
import { Method, URL } from './const';

// $======================== PointsApiService ========================$ //

export default class PointsApiService extends ApiService {

  get points() {
    return this._load({ url: URL.POINTS })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: URL.OFFERS })
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: URL.DESTINATIONS })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,

      //? вот тут чёт не очень понял прикол ↓

      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : point.dateFrom,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : point.dateTo,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
