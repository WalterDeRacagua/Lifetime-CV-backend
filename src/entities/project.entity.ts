import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'simple-array' })
  technologies!: string[];

  @Column({ nullable: true })
  demoUrl!: string;

  @Column({ nullable: true })
  githubUrl!: string;

  @Column({ type: 'simple-json', nullable: true })
  imageUrls!: string[];

  @Column({ default: false })
  featured!: boolean;

  @Column({ default: 0 })
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
