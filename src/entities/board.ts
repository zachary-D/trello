import { Client } from "../client";
import { LabelDataRaw, LimitsObject, Prefs } from "./apiTypes";
import { Entity } from "./entity";
import { HTTP } from "../types";

//TODO: the data returned by the API is significantly less that this
//TODO: alphabetize/otherwise sort (or should we leave it in the order according to the documentation?)
//TODO: move to apiTypes?
export interface BoardDataRaw {
	id: string;
	desc: string;
	//TODO: figure out how this is different from `desc`
	descData: string;
	closed: boolean;
	idMemberCreator: string;
	idOrganization: string;
	pinned: boolean;
	url: string;
	shortUrl: string;
	prefs: Prefs;

	//Only present if the 'labels' nested resource is requested
	labels?: LabelDataRaw[]

	//You likely *won't* want to use these, it doesn't show multiple labels if they have the same color, and still returns the color name even if the label is missing
	labelNames: {
		//TODO: figure out if this is even useful - what if there are multiple labels with the same color? (that is a thing the web UI supports)
		//duplicate labels just aren't shown here
		green: string;
		yellow: string;
		orange: string;
		red: string;
		purple: string;
		blue: string;
		sky: string;
		lime: string;
		pink: string;
		black: string;
	}
	limits: {
		attachments: {
			perBoard: LimitsObject;
		}
	}
	starred: boolean;
	memberships: string;
	shortLink: string;
	subscribed: boolean;
	powerUps: string;
	dateLastActivity: string;
	dateLastView: string;
	idTags: string;
	datePluginDisable: null | string;
	creationMethod: null | string;
	ixUpdate: number;
	templateGallery: null | string;
	enterpriseOwned: boolean;
}

export class Board extends Entity<BoardDataRaw> {
	get closed() { return this.raw.closed; }
	get desc() { return this.raw.desc; }

	static override async fetch(client: Client, id: string): Promise<Board> {
		const data = await Board.fetchData(client, id);
		return new Board(client, data);
	}

	static override async fetchData(client: Client, id: string): Promise<BoardDataRaw> {
		return await client.makeRequest(HTTP.get, `/1/boards/${id}`, {
			labels: "all",
			label_fields: "color,idBoard,name",
			labels_limit: 100
		});
	}

	async refresh(): Promise<void> {
		this.assign(await Board.fetchData(this.client, this.id));
	}
}

