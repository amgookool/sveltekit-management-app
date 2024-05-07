<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { cn } from '@/utils';
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	import { ArrowLeftToLine, CircleAlert } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;
	
	$: if (form?.error) {
		toast.error(form?.error);
	}
	$: if (form?.success) {
		toast.success(`Password reset link has been sent to ${form?.data.email}`);
		goto('/login');
	}
</script>

<svelte:head>
	<title>{data.props.title}</title>
	<meta name="description" content="Login Page for management application" />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>
<div class="flex justify-center items-center h-screen">
	<Card.Root class={cn('w-[380px]')}>
		<Card.Header>
			<img class={cn('px-2 py-4')} src="/logoipsum297.svg" alt="Logo" />
			<Card.Title class={cn('text-3xl')}>Password Reset</Card.Title>
			<Card.Description>Enter your email to reset your password.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="post" use:enhance>
				<div class="grid w-full items-center gap-6">
					<div class="flex flex-col space-y-3">
						<Label for="email">Email</Label>
						<Input
							type="text"
							name="email"
							id="email"
							placeholder="Email Address"
							value={form?.data?.email}
						/>
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
				</div>
				<Button variant="default" type="submit" class={cn('w-full mt-3 font-bold text-lg')}
					>Reset Password</Button
				>
			</form>
		</Card.Content>
		<Card.Footer>
			<a class="" href="/login">
				<Button variant="ghost" type="button">
					<span class={cn('flex flex-row items-center hover:text-primary  hover:animate-arrow-left')}>
						<ArrowLeftToLine size="24" strokeWidth="2" />
						<p>Back to Login</p>
					</span>
				</Button>
			</a>
		</Card.Footer>
	</Card.Root>
</div>
