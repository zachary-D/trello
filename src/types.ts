export enum Rest {
	get = "get",
	delete = "delete",
	post = "post",
	update = "update"
};

export type HttpRequestType = Rest | "get" | "delete" | "post" | "update";