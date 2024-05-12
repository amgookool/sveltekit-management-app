import { writable } from "svelte/store";

const createSideBarCollapseState = () => {
    const { subscribe, set, update } = writable<boolean>(false);
    return {
        subscribe,
        set,
        toggle: () => update(state => !state),
    }
}

const createSideBarActiveState = () => {
    const { subscribe, set, update } = writable<string>('/dashboard');
    return {
        subscribe,
        set,
        update,
    }
};



export const sideBarCollapseState = createSideBarCollapseState();

export const sideBarActiveState = createSideBarActiveState();