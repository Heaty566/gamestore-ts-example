export interface TagInterface extends SpeciesInterface {}
export interface NewTagInterface extends NewSpecieInterface {}

export interface NewSpecieInterface {
  name: string;
}

export interface SpeciesInterface extends NewSpecieInterface {}
