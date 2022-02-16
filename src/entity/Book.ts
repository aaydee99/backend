import { Entity, Column, BeforeInsert } from 'typeorm';

import { ExtendedBaseEntity } from './Base';

@Entity()
export class Book extends ExtendedBaseEntity {
	@Column('text', { unique: true })
	ISBN: string;

	@Column('text')
	title: string;

	@Column('text')
	subject: string;

	@Column('text')
	publisher: string;

	@Column()
	numberOfPages: number;

	@Column('text')
	author: string;

	@Column()
	numberOfCopies: number;

	@Column()
	numberOfAvailable: number;

	@Column('numeric', { precision: 2 })
	price: number;

	@BeforeInsert()
	setNumberOfAvailable() {
		this.numberOfAvailable = this.numberOfCopies;
	}
}
