import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('experiences')
export class Experience {
  // Con las exclamaciones estamos diciendo a Typescript que se fie de nosotros, que TypeORM asignará un valor a esta propiedad.
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  company!: string;

  @Column()
  position!: string;

  //Le ponemos text para que no haya un límite de 255 caracteres que tiene varchar
  @Column({ type: 'text' })
  description!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date', nullable: true })
  endDate!: Date;

  @Column({ default: false })
  isCurrent!: boolean;

  @Column({ default: 0 })
  order!: number;

  // Si no me equivoco typeORM añade esta entrada automáticamente.
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
