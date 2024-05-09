import { writable } from "svelte/store";


const createSideBarToggleState = () => {
    const { subscribe, set, update } = writable<boolean>(false);
    return {
        subscribe,
        set,
        toggle: () => update(state => !state),
    }
}

const createSideBarActiveState = () => {
    const { subscribe, set, update } = writable<boolean>(false);
    return {
        subscribe,
        set,
        toggle: () => update(state => !state),
    }
};



export const sideBarToggleState = createSideBarToggleState();

export const sideBarActiveState = createSideBarActiveState();