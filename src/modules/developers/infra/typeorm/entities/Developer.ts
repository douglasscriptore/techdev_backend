import Level from '@modules/levels/infra/typeorm/entities/Level';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EnumGender {
  Male = 'masculino',
  Female = 'feminino',
  Other = 'outro',
}

@Entity('developers')
class Developer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullname: string;

  @Column({ nullable: true })
  hobby: string;

  @Column({
    type: 'enum',
    enum: EnumGender,
  })
  gender: EnumGender;

  @Column()
  dateofborn: Date;

  @Column()
  age: number;

  @Column()
  level_id: number;

  @ManyToOne(() => Level)
  @JoinColumn({ name: 'level_id' })
  level: Level;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Developer;
