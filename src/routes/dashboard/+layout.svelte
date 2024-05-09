<script lang="ts">
	import Sidebar from '@/components/layout/Sidebar.svelte';
	import { Home, LineChart, Package, ShoppingCart, Users } from 'lucide-svelte';
	import Header from './../../lib/components/layout/Header.svelte';

	const sidebar_nav_items = [
		{
			icon: Home,
			text: 'Dashboard',
			href: '/dashboard',
			count: 8
		},
		{
			icon: ShoppingCart,
			text: 'Orders',
			href: '/dashboard/orders',
			count: 2
		},
		{
			icon: Package,
			text: 'Products',
			href: '/dashboard/products',
			count: null
		},
		{
			icon: Users,
			text: 'Users',
			href: '/dashboard/users',
			count: 1
		},
		{
			icon: LineChart,
			text: 'Analytics',
			href: '/dashboard/analytics',
			count: null
		}
	];
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<Sidebar nav_links={sidebar_nav_items} />
	<div class="flex flex-col space-x-2">
		<Header nav_links={sidebar_nav_items} />
		<slot />
	</div>
</div>
