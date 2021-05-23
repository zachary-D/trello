export abstract class Entity<DataRaw> {
	//The entity's raw data
	protected raw: DataRaw;

	//Applies new or updated entity data to the entity
	abstract assign(raw: DataRaw): this;

	//Retrieves a new entity from the API
	abstract fetch(id: string): Promise<Entity<DataRaw>>;

	//Refreshes the current entity
	abstract refresh(): Promise<void>;
}