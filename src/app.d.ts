// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
	interface Locals {
		user: {
			username: string;
			avatar: string;
			id: string;
			userEmail: string;
			userRole: string;
			firstName: string;
			lastName: string;
			avatar: string;
			isLocked: boolean;
			isVerified: boolean;
			isDeleted: boolean;
			forcePasswordChange: boolean;
			accessToken: string;
		} | null;
	}
	// interface PageData { }
	// interface Error {}
	// interface Platform {}
}