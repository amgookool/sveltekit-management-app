import { ComponentType } from 'svelte';


interface SideBarNavItem {
	icon: ComponentType;
	text: string;
	href: string;
	count: number | null;
}
