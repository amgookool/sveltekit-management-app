import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
    logout: async (event) => {
        console.log(event.request.url)
        console.log("Logout Action called");
        const refresh_token = event.cookies.get('refresh_token');
        if (refresh_token)
            event.cookies.delete('refresh_token', { path: '/' });
        throw redirect(301,'/login');
    }
}