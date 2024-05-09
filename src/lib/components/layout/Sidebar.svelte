<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	// import { Button } from '$lib/components/ui/button/index.js';
	import type { SideBarNavItem } from '@/types/components';
	import { cn } from '@/utils';

	export let nav_links: SideBarNavItem[];
</script>

<!-- 
bg-muted


 -->
<div class="hidden border-r bg-muted/40 md:block">
	<div class="flex h-full max-h-screen flex-col gap-2">
		<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
			<a href="/dashboard" class="flex items-start gap-2">
				<img class={cn('px-2 ')} src="/logoipsum297.svg" alt="Logo" />
			</a>
			<!-- <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
				<Bell class="h-4 w-4" />
				<span class="sr-only">Toggle notifications</span>
			</Button> -->
		</div>
		<div class="flex-1">
			<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
				{#each nav_links as { icon, text, href, count }}
					<a
						{href}
						class={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`}
					>
						<svelte:component this={icon} class="h-4 w-4" />
						{text}
						{#if count != null}
							<Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								{count}
							</Badge>
						{/if}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
