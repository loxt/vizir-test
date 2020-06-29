import { Injectable } from '@angular/core';
import data from '../../../data';

interface Data {
  destiny: number;
  origin: number;
  id?: number;
  pricePerMinute: number;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  getOrigins(): Array<number> {
    return data.origins;
  }

  getDestinations(): Array<number> {
    return data.destinations;
  }

  getData(): Array<Data> {
    return data.call;
  }
}
