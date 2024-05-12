<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
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
		toast.success(`Password Reset was successful. Redirecting to login page.`);
		goto('/login');
	}
</script>

<svelte:head>
	<title>{data.props.title}</title>
	<meta name="description" content="Reset Password Page for management application" />
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
						<Label for="password">Password</Label>
						<Input type="text" name="password" id="password" placeholder="Password" />
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
					<div class="flex flex-col space-y-3">
						<Label for="confirmPassword">Confirm Password</Label>
						<Input
							type="text"
							name="confirmPassword"
							id="confirmPassword"
							placeholder="Confirm Password"
						/>
						<Label for="confirmPasswordError" class={cn('flex items-center gap-1 text-xs')}>
							{#if form?.errors?.confirmPassword}
								<div class="flex flex-col">
									{#each form?.errors?.confirmPassword as error, i}
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
					<span
						class={cn('flex flex-row items-center hover:text-primary  hover:animate-arrow-left')}
					>
						<ArrowLeftToLine size="24" strokeWidth="2" />
						<p>Back to Login</p>
					</span>
				</Button>
			</a>
		</Card.Footer>
	</Card.Root>
</div>
