import { Collection } from "@discordjs/collection";

import { Board } from "./board";
import { LimitsObject, MarketingOptIn, MemberPrefs, MessagesDismissed } from "./apiTypes";
import { Client } from "../client";

// member schema according to https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-get
export interface MemberDataRaw {
	// aaBlockSyncUntil: any | null;	//unknown - returned but not in official schema
	aaEmail: string;
	aaEnrolledDate: string | null;
	aaId: string;
	activityBlocked: boolean;
	avatarHash: string;
	avatarSource: string;
	avatarUrl: string;
	bio: string;
	bioData: { emoji: {} } | null;
	confirmed: boolean;
	credentialsRemovedCount: number;
	// domainClaimed: any | null;		//unknown - returned but not in official schema
	email: string;
	fullName: string;
	gravatarHash: string;
	id: string;
	idBoards: string[];
	idEnterprise: string | null;
	idEnterprisesAdmin: string[];
	idEnterprisesDeactivated: string[];
	idMemberReferrer: string | null;
	idOrganizations: string[];
	idPremOrgsAdmin: string[];
	initials: string;
	isAaMastered: boolean;
	ixUpdate: string;
	limits: LimitsObject;
	loginTypes: string;
	marketingOptIn: MarketingOptIn;
	memberType: "normal" | "ghost";
	messagesDismissed: MessagesDismissed[];
	nonPublic: {};				//Literally defined as just '{}' on the API
	nonPublicAvailable: boolean;
	oneTimeMessagesDismissed: string[];
	prefs: MemberPrefs;
	premiumFeatures: string[];
	products: number[];
	// siftDecision: any | null;	//unknown - returned but not in official schema
	status: "disconnected";		//Just this value - always
	trophies: string[];
	uploadedAvatarHash: string | null,
	uploadedAvatarUrl: string | null,
	url: string;
	username: string;
}

export class Member {
	boards: Collection<string, Board>;
	get boardIds() { return this.raw.idBoards; }

	readonly client: Client;

	get email() { return this.raw.email; }
	get id() { return this.raw.id; }
	get username() { return this.raw.username; }

	raw: MemberDataRaw;

	constructor(client: Client, data: MemberDataRaw) {
		this.client = client;
		this.raw = data;
	}

	async fetchBoard(boardId: string): Promise<Board> {
		const board = await Board.fetch(boardId);
		const cachedBoard = this.boards.get(board.id);
		if(cachedBoard) {
			Object.assign(cachedBoard.raw, board.raw);
			return cachedBoard;
		} else {
			this.boards.set(board.id, board);
			return board;
		}
	}
}