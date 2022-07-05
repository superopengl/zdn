import { Tag } from './Tag';
import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, JoinColumn, DeleteDateColumn, JoinTable, ManyToMany, OneToOne, Unique } from 'typeorm';
import { Role } from '../types/Role';
import { UserStatus } from '../types/UserStatus';
import { Org } from './Org';
import { UserProfile } from './UserProfile';
@Entity()
@Index('user_unique_email', { synchronize: false })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt: Date;

  // @Index('user_email_unique', { unique: true })
  /**
   * The unique index of user_email_unique will be created by migration script,
   * as TypeOrm doesn't support case insensitive index.
   */
  @Column()
  @Index({ unique: true })
  emailHash!: string;

  @Column({ default: 'local' })
  loginType: string;

  @Column()
  secret!: string;

  @Column({ type: 'uuid' })
  salt!: string;

  @Column({ nullable: false })
  @Index()
  role!: Role;

  @Column({ nullable: true })
  lastLoggedInAt?: Date;

  @Column({ nullable: true })
  lastNudgedAt?: Date;

  @Column({ default: UserStatus.Enabled })
  status!: UserStatus;

  @Index('user_resetPasswordToken_unique', { unique: true })
  @Column({ type: 'uuid', nullable: true })
  resetPasswordToken?: string;

  @Column('uuid', { nullable: true })
  @Index()
  orgId: string;

  @DeleteDateColumn()
  @Index()
  deletedAt: Date;

  @OneToOne(() => UserProfile, { orphanedRowAction: 'delete' })
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile: UserProfile;

  @Column('uuid')
  profileId: string;

  @ManyToMany(type => Tag, { onDelete: 'CASCADE' })
  @JoinTable()
  tags: Tag[];

  @Column({ default: false })
  orgOwner: boolean;
}
