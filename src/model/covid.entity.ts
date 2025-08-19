import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CovidData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  confirmed: number;

  @Column()
  recovered: number;

  @Column()
  deaths: number;

  @Column()
  date: Date;
}

@Entity()
export class CovidGlobalData {
  @PrimaryGeneratedColumn()
  id: number; // Add id for uniqueness

  @Column()
  confirmed: number;

  @Column()
  recovered: number;

  @Column()
  deaths: number;

  @Column()
  date: Date;
}