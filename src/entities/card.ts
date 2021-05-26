import { Entity } from "./entity";

export interface CardDataRaw {
	id: string;
}

export class Card extends Entity<CardDataRaw> {
	override async refresh(): Promise<void> {
		this.assign(await Card.fetchData(this.client, this.id));
	}
}