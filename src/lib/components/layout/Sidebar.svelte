<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { SideBarNavItem } from '@/types/components';
	import { cn } from '@/utils';
	import { ArrowLeft } from 'lucide-svelte';
	import { sideBarCollapseState, sideBarActiveState } from '@/components/layout/states';

	export let nav_links: SideBarNavItem[];
</script>



<div class="hidden border-r bg-muted/50 md:block">
	<div class="flex h-full max-h-screen flex-col gap-2">
		<div
			class={`flex h-14 items-center border-b relative lg:h-[60px]  ${$sideBarCollapseState ? 'px-4 lg:px-2' : 'px-8 lg:px-6'}`}
		>
			<a
				href="/dashboard"
				class={`flex ${$sideBarCollapseState ? ' items-center' : 'items-start'}`}
			>
				{#if !$sideBarCollapseState}
					<img class={cn('mx-auto', $sideBarCollapseState && 'scale-0 duration-300')} src="/logoipsum297.svg" alt="Logo" />
				{:else}
					<img class={cn('mx-auto', !$sideBarCollapseState && 'scale-0 duration-150')} src="/logoipsum296.svg" alt="Compact Logo" />
				{/if}
			</a>
			<Button
				on:click={() => {
					sideBarCollapseState.toggle();
				}}
				variant="outline"
				size="sm"
				class={cn('absolute p-2 -right-4 rounded-full')}
				><ArrowLeft
					size={20}
					class={`duration-300 ${$sideBarCollapseState ? 'rotate-180' : 'rotate-0'}`}
				/>
			</Button>
		</div>
		<div class="flex-1">
			<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
				{#each nav_links as { icon, text, href, count }}
					<a on:click={() => sideBarActiveState.set(href)}
						{href}
						class={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary duration-0 ${$sideBarCollapseState && 'hover:text-primary'} ${
							!$sideBarCollapseState && $sideBarActiveState == href && 'hover:bg-primary/10 bg-primary/10 text-primary'
						} ${$sideBarCollapseState  && $sideBarActiveState == href && 'text-primary'  } `}
					>
						<div class={`${$sideBarCollapseState ? 'flex flex-col items-start relative' : ''}`}>
							<svelte:component
								this={icon}
								class={`duration-300 ${$sideBarCollapseState ? 'h-8 w-8' : 'h-6 w-6'}`}
							/>
							{#if $sideBarCollapseState}
								<div
									class={`duration-300 text-xs relative ${text == 'Users' || text == 'Orders' ? '' : 'right-2'}`}
								>
									<span class={`duration-300 ${$sideBarCollapseState ? 'scale-0' : ''}`}
										>{text}</span
									>
								</div>
							{/if}
						</div>

						{#if !$sideBarCollapseState}
							<span class={`duration-300 ${$sideBarCollapseState ? 'scale-0' : ''}`}>{text}</span>
							{#if count != null}
								<Badge
									class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
								>
									{count}
								</Badge>
							{/if}
						{/if}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
