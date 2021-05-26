export enum HTTP {
	get = "get",
	delete = "delete",
	post = "post",
	update = "update"
};

export type HttpRequestMethod = HTTP | "get" | "delete" | "post" | "update"