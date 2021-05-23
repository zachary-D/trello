import * as superagent from "superagent";
import { HttpRequestType } from "./types";

const TRELLO_API_URL = "https://api.trello.com";

export class Client {
	apiKey: string;
	apiToken: string;

	constructor(apiKey: string, apiToken: string) {
		this.apiKey = apiKey;
		this.apiToken = apiToken;
	}

	async makeRequest(method: HttpRequestType, path: string, data: any): Promise<any> {
		//Inject api credentials
		Object.assign(data, {key: this.apiKey, token: this.apiToken});

		const response = await superagent(method, TRELLO_API_URL + path)
			.send(data);

		//TODO: handle errors
		//TODO: handle 429 - https://developer.atlassian.com/cloud/trello/guides/rest-api/rate-limits/

		return response.body;
	}
}