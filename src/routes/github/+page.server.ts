import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		props: {
			title: 'Koolkeyz Management - GitHub Sign In'
		}
	};
}) satisfies PageServerLoad;
