import { Column, PrimaryGeneratedColumn, Entity, Index, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne } from 'typeorm';
import { TaskStatus } from '../types/TaskStatus';
import { TaskDoc } from '../types/TaskDoc';
import { Org } from './Org';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Index({ unique: true })
  deepLinkId: string;

  @Column('uuid')
  @Index()
  orgId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Index()
  lastUpdatedAt: Date;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: TaskStatus.TODO })
  @Index()
  status: TaskStatus;

  @Column('uuid')
  @Index()
  taskTemplateId: string;

  @Column('uuid', { nullable: true })
  @Index()
  portfolioId: string;

  @Column('uuid', { nullable: true })
  @Index()
  agentId?: string;

  @Column('uuid')
  @Index()
  userId: string;

  @Column({ type: 'json' })
  fields: any;

  // @Column({ type: 'json', default: [] })
  // genDocs: GenDoc[];

  // @Column({ type: 'varchar', array: true, default: '{}' })
  // uploadDocs: string[];

  // @Column({ type: 'varchar', array: true, default: '{}' })
  // signDocs: string[];

  // @Column({ type: 'varchar', array: true, default: '{}' })
  // feedbackDocs: string[];

  @Column({ type: 'json', default: [] })
  docs: TaskDoc[];

  @Column({ nullable: true })
  @Index()
  dueDate: Date;
}

