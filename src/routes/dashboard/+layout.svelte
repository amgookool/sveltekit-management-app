<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from '@/components/layout/Sidebar.svelte';

	export let data: LayoutData;
</script>

<Sidebar />
<main>
	<slot />
</main>
