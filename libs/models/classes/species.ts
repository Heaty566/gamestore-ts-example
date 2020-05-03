import { SpeciesInterface } from "../interfaces/speciesInterface";

export abstract class SpeciesClass implements SpeciesInterface {
  constructor(public name: string) {}
}
