import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted ${this.email} with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated ${this.email} with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed ${this.email} with id ${this.id}`);
  }
}
