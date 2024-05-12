<script lang="ts">
	import ThemeSwitcher from '$lib/components/layout/ThemeSwitcher.svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { changePasswordModalState } from '@/components/modals/state';
	import type { SideBarNavItem } from '@/types/components';
	import type { UserTypes } from '@/types/users';
	import { cn } from '@/utils';
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import { sideBarActiveState } from './states';

	export let nav_links: SideBarNavItem[];
	export let user: UserTypes.AuthorizedUser | null;

	const generateNameAbbreviation = () => {
		if (user?.firstName && user?.lastName) {
			return `${user.firstName[0]}${user.lastName[0]}`;
		} else {
			return `${user?.userRole[0]}`;
		}
	};
</script>

<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="flex flex-col">
			<nav class="grid gap-2 text-lg font-medium">
				<a href="/dashboard" class="flex items-center gap-2 text-lg font-semibold">
					<img class={cn('px-2 ')} src="/logoipsum297.svg" alt="Logo" />
				</a>
				{#each nav_links as { icon, text, href, count }, i}
					<a
						on:click={() => sideBarActiveState.set(href)}
						{href}
						class={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${$sideBarActiveState == href && 'bg-muted'}`}
					>
						<svelte:component this={icon} class="h-5 w-5" />
						{text}
						{#if count !== null}
							<Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								{count}
							</Badge>
						{/if}
					</a>
				{/each}
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<div class="w-full flex-1">
		<form>
			<div class="relative">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search products..."
					class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
				/>
			</div>
		</form>
	</div>
	<div class="flex gap-2">
		<ThemeSwitcher />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
					<Avatar.Root>
						<Avatar.Image src={`${user?.avatar ?? ''}`} alt="avatar" />
						<Avatar.Fallback>{generateNameAbbreviation()}</Avatar.Fallback>
					</Avatar.Root>
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<a
						on:click={() => sideBarActiveState.set(`/dashboard`)}
						class="container text-center hover:text-primary"
						href={`/dashboard/${user?.id}`}
					>
						View Profile
					</a>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<button
						class="container text-center hover:text-primary"
						type="button"
						on:click={() => {
							changePasswordModalState.open();
						}}
					>
						Change Password
					</button>
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<form
						class={`w-full text-center hover:text-primary`}
						action="/dashboard?/logout"
						method="post"
					>
						<button type="submit" class={`container w-full`}> Logout </button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>
