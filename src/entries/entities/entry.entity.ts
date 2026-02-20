import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;
}