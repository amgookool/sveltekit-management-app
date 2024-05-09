import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
    console.log(event.url.pathname)
    return {};
}) satisfies LayoutServerLoad;