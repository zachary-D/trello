//Interfaces in this file are pulled from the Trello API documentation

export interface LimitsObject {
	disableAt: number;
	status: "ok" | "warning";
	warnAt: number;
}

export interface MarketingOptIn {
	optedIn: boolean;
	date: string;
}

export interface MemberPrefs {
	timezoneInfo: {
		offsetCurrent: number;
		timezoneCurrent: string;
		offsetNext: number;
		dateNext: string;
		timezoneNext: string;
	};

	privacy: {
		fullName: "public" | "private" | "collaborator";
		avatar: "public" | "private" | "collaborator";
	}

	sendSummaries: boolean;
	minutesBetweenSummaries: number;
	minutesBeforeDeadlineToNotify: number;
	colorBlind: boolean;
	locale: string;
	timezone: string;
	twoFactor: {
		enabled: boolean;
		needsNewBackups: boolean;
	}
}

export interface MessagesDismissed {
	_id: string;
	name: string;
	count: string;
	lastDismissed: string;
}

export interface Prefs {
	background: string;
	backgroundImage: string;
	backgroundImageScaled: string;
	calendarFeedEnabled: boolean;
	cardAging: "normal", "private";
	cardCovers: boolean;
	comments: string;
	invitations: any;
	isTemplate: boolean;
	hideVotes: boolean;
	permissionLevel: "board" | "org";
	selfJoin: boolean;
	voting: "disabled" | "enabled";
}