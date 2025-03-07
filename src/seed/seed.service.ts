import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executedSeedUno() {
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    data.results.forEach(async ({ name, url }) => {
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

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );

    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
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

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonToInsert: { name: string; id: number }[] = [];

    data.results.forEach(({ name, url }) => {
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
