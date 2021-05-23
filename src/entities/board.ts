import { LimitsObject, Prefs } from "./apiTypes";

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
	labelNames: {
		//TODO: figure out if this is even useful - what if there are multiple labels with the same color? (that is a thing the web UI supports)
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

export class Board {
	get closed() { return this.raw.closed; }
	get desc() { return this.raw.desc; }
	get id() { return this.raw.id; }

	//TODO: implement a Entity class/interface for everything built off a Trello API response object (anything with a .raw -> data prop)
	// .assign(raw data) - copy new/updated data from the API, maintain itself as applicable (destroy/unlink child entities that no longer exist)
	// <static> .fetch(id) - load a new instance of itself from the API
	// .refresh() - pull new data from the API and assign it to self

	raw: BoardDataRaw;
}