// import { koolkeyzAPIFetch } from "$hooks/apiRequests.hooks";
import {
    rootPageHook, loginPageHook, githubSignInPathHook
} from "@/hooks/authentication.hooks";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";


export const handle: Handle = sequence(
    rootPageHook,
    loginPageHook,
    githubSignInPathHook
);