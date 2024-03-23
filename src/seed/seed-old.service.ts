import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executedSeedUno() {
    const response = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    response.data.results.forEach(async ({ name, url }) => {
      console.log(`Name: ${name} - URL: ${url}`);

      const segments = url.split('/');
      const id = +segments[segments.length - 2];

      const pokemon = await this.pokemonModel.create({ name, id });

      console.log(pokemon);
    });

    return 'Seed Executed!';
  }

  async executedSeedDos() {
    await this.pokemonModel.deleteMany({});

    const response = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const insertPromisesArray = [];

    response.data.results.forEach(({ name, url }) => {
      console.log(`Name: ${name} - URL: ${url}`);

      const segments = url.split('/');
      const id = +segments[segments.length - 2];

      //const pokemon = await this.pokemonModel.create({ name, id });
      insertPromisesArray.push(this.pokemonModel.create({ name, id }));
    });

    await Promise.all(insertPromisesArray);

    return 'Seed Executed!';
  }

  async executedSeed() {
    await this.pokemonModel.deleteMany({});

    const response = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; id: number }[] = [];

    response.data.results.forEach(({ name, url }) => {
      console.log(`Name: ${name} - URL: ${url}`);

      const segments = url.split('/');
      const id = Number(segments[segments.length - 2]);

      //const pokemon = await this.pokemonModel.create({ name, id });
      pokemonToInsert.push({ name, id });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed!';
  }
}
