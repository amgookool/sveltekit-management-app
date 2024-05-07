<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { cn } from '@/utils';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { CircleAlert, Github, RectangleEllipsis } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { fade,slide } from 'svelte/transition';

	export let data: PageData;
	export let form: ActionData;
	$: if (form?.error) {
		toast.error(form?.error);
	}
</script>

<svelte:head>
	<title>{data.props.title}</title>
	<meta name="description" content="Login Page for management application" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>
<div transition:slide={{ duration: 400, axis:'x' }} class="flex justify-center items-center h-screen">
	<Card.Root class={cn('w-[380px]')}>
		<Card.Header>
			<img class={cn('px-2 py-4')} src="/logoipsum297.svg" alt="Logo" />
			<Card.Title class={'text-3xl'}>Login</Card.Title>
			<Card.Description>Sign In with your email and password.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form action="?/login" method="post" use:enhance>
				<div class="grid w-full items-center gap-6">
					<div class="flex flex-col space-y-3">
						<Label for="email">Email</Label>
						<Input type="text" name="email" id="email" placeholder="Email Address" value="" />
						<Label for="emailError" class={cn('flex items-center gap-1 text-xs')}>
							{#if form?.errors?.email}
								<div class="flex flex-col">
									{#each form?.errors?.email as error, i}
										<span class="flex flex-row gap-1 items-center my-0.5">
											<CircleAlert size="14" class={cn('text-red-500')} />
											<p class="text-red-500">{error}</p>
										</span>
									{/each}
								</div>
							{/if}
						</Label>
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label for="password">Password</Label>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={form?.data?.password}
						/>
						<Label for="passwordError" class={cn('flex items-center gap-1 text-xs')}>
							{#if form?.errors?.password}
								<div class="flex flex-col">
									{#each form?.errors?.password as error, i}
										<span class="flex flex-row gap-1 items-center my-0.5">
											<CircleAlert size="14" class={cn('text-red-500')} />
											<p class="text-red-500">{error}</p>
										</span>
									{/each}
								</div>
							{/if}
						</Label>
					</div>
				</div>
				<Button variant="default" type="submit" class={cn('w-full mt-3 font-bold text-lg')}
					>Login</Button
				>
			</form>
			<a href="/reset-password">
				<Button variant="secondary" class={cn('w-full mt-3 gap-1')}>
					<RectangleEllipsis />
					Reset Password
				</Button>
			</a>
		</Card.Content>
		<div class="flex items-center justify-center -mt-3">
			<hr class="w-full ml-2 border-t-2 border-gray-800" />
			<span class="mx-2 text-gray-600 font-semibold">OR</span>
			<hr class="w-full mr-2 border-t-2 border-gray-800" />
		</div>
		<Card.Footer class={cn('flex-col justify-center')}>
			<a class="w-full" href={data.props.github_signin_url}>
				<Button variant="secondary" class={cn('w-full bg-slate-900')}>
					<Github class={cn('text-green-500')} />
					<p class="font-semibold text-md">GitHub Sign In</p>
				</Button>
			</a>
		</Card.Footer>
	</Card.Root>
</div>
