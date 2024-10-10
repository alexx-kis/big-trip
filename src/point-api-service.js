import ApiService from './framework/api-service';

// $======================== PointApiService ========================$ //

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class PointApiService extends ApiService {

  get points() {
    return this._load({ url: 'points' })
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
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toIsoString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toIsoString() : null,
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
