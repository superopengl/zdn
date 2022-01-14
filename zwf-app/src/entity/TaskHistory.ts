import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../types/TaskStatus';
import { TaskDoc } from '../types/TaskDoc';

@Entity()
export class TaskHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  historyCreatedAt: Date;

  @Column('uuid')
  taskId: string;

  @Column()
  name: string;

  @Column({ default: TaskStatus.TODO })
  status: TaskStatus;

  @Column('uuid', { nullable: true })
  agentId?: string;

  @Column({ type: 'json' })
  fields: any;

  @Column({ type: 'json', default: [] })
  docs: TaskDoc[];
}
