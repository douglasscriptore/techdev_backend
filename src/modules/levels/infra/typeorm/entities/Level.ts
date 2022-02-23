import Developer from '@modules/developers/infra/typeorm/entities/Developer';
import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('levels')
class Level {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Exclude()
  @OneToMany(() => Developer, developer => developer.level)
  developers: Developer[];

  @Column()
  levelname: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'developersCount' })
  getDevelopersCount(): number {
    return this.developers.length || 0;
  }
}

export default Level;
