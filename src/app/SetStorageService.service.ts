interface ICache {
	[key: string]: any
}

export class LocalStorageService {

	private cache: ICache;
	private keyPrefix: string;
	/* private valueQuantity: number; */

	constructor() {
		this.cache = Object.create(null);
		this.keyPrefix = "TicketsIntoBasket"; 
		/* this.valueQuantity = 0; */
		window.addEventListener( "storage", this.handleStorageEvent);
	}

	public getItem(key: string) : any {
		let normalizeKey = this.normalizeKey(key);
		if (normalizeKey in this.cache) {

			return(this.cache[normalizeKey]);

		}
		console.warn( "Reading from underlying localStorage." );

		return(this.cache[normalizeKey] = JSON.parse(localStorage.getItem(normalizeKey)));

	}

	public setItem(key: string, value: any) : void {
		let normalizeKey = this.normalizeKey(key);
		this.cache[normalizeKey] = value;
		localStorage.setItem(normalizeKey, JSON.stringify(value));
	}

	private handleStorageEvent = (event: StorageEvent) : void => {
		if (!event.key.startsWith(this.keyPrefix)) {
			return;
		}
		if (event.newValue === null) {
			delete(this.cache[ event.key]);
		} else {
			this.cache[event.key] = JSON.parse(event.newValue);
		}
	}

	private normalizeKey(key: string) : string {
		return( this.keyPrefix + key );
	}
}