import { EnumGender } from '../infra/typeorm/entities/Developer';

export default interface ICreateDeveloperDTO {
  fullname: string;
  gender: EnumGender;
  dateofborn: Date;
  age: number;
  level_id: number;
}
