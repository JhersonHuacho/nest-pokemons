import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executedSeed() {
    const response = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );
    response.data.results.forEach(({ name, url }) => {
      console.log(`Name: ${name} - URL: ${url}`);

      const segments = url.split('/');
      const id = segments[segments.length - 2];

      console.log({ name, id });
    });
    return response.data.results;
  }
}
