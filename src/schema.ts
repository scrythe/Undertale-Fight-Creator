export interface Attack {
  speed: { x: number; y: number };
  end: number;
}

export type Attacks = Attack[];

export interface Schema {
  $schema: string;
  attacks: Attacks;
}
