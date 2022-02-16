import { hash } from 'bcryptjs';
import { Entity, Column, BeforeInsert, CreateDateColumn } from 'typeorm';

import { ExtendedBaseEntity } from './Base';

export enum UserStatus {
	ACTIVE = 'ACTIVE',
	CLOSED = 'CLOSED',
	CANCELED = 'CANCELED',
	BLACKLISTED = 'BLACKLISTED',
	NONE = 'NONE',
}

export enum UserRole {
	LIBRARIAN = 'LIBRARIAN',
	MEMBER = 'MEMBER',
}

@Entity('users')
export class User extends ExtendedBaseEntity {
	@Column('text')
	name: string;

	@Column('text', { unique: true })
	email: string;

	@Column('text')
	password: string;

	@Column('text')
	status: UserStatus = UserStatus.NONE;

	@Column('text')
	phone: string;

	@Column('text')
	role: UserRole = UserRole.MEMBER;

	@CreateDateColumn()
	dateOfMembership: Date;

	@Column()
	totalBooksCheckedout: number = 0;

	@Column()
	tokenVersion: number = 0;

	token: string;

	@BeforeInsert()
	async hashPass() {
		this.password = await hash(this.password, 10);
	}
}
