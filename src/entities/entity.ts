import { Client } from "../client";

//Ideally we'd use a 'real' abstract static method in the cases where this error is throw, but they aren't supported by typescript (yet)
export class AbstractStaticMethodError extends Error {
	constructor(abstractMethodName: string) {
		super(`Abstract static method '${abstractMethodName}' must be overloaded by the inheriting class before it can be used`);
	}
}

interface DataRawBase {
	id: string;
}

export abstract class Entity<DataRaw extends DataRawBase> {
	//Default data applied to all requests on this entity.  Recommended use is for setting default nested resource params
	static defaultRequestData: Object;

	get id() { return this.raw.id; }

	//The client that instantiated this entity, and that is used to make requests
	protected _client: Client;
	get client(): Client {
		return this._client;
	}

	//The entity's raw data
	protected _raw: DataRaw;
	get raw(): DataRaw {
		return this._raw;
	}

	constructor(client: Client, raw: DataRaw) {
		this._client = client;
		this._raw = raw;
	}

	//Applies new or updated entity data to the entity
	assign(raw: DataRaw): void {
		this._raw = raw;
	}

	//Retrieves a new entity from the API
	static async fetch(client: Client, id: string): Promise<any> {
		throw new AbstractStaticMethodError("fetch");
	}

	//Retrieves the data for the given entity from the API (does not instantiate an entity)
	static fetchData(client: Client, id: string): Promise<any> {
		throw new AbstractStaticMethodError("fetchData");
	};

	//Refreshes the current entity
	abstract refresh(): Promise<void>;
}