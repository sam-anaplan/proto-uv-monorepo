import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'

import { RandomNumberDto } from './dto/random-number'

@Injectable({
  providedIn: 'root',
})
export class NumberService {
  constructor(private httpClient: HttpClient) { }

  private url(path: string) {
    return `http://localhost:10668/${path}`
  }

  async getRandomNumber() {
    return (await firstValueFrom(
      this
        .httpClient
        .get<RandomNumberDto>(this.url('number/random/100'))
    )).random_number
  }
}
