<script lang="ts">
	import { cn } from '@/utils';
    import type { PageData } from './$types';
    import Icon from '@iconify/svelte';
    export let data: PageData;

</script>

<svelte:head>
	<title>{data.props.title}</title>
	<meta name="description" content="GitHub Sign In Page for management application" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>


<main class="flex justify-center items-center h-screen">
	<Icon icon="line-md:github-loop" class={cn("w-1/2 h-1/2 animate-none bg-clip-text text-green-700")} />
</main>