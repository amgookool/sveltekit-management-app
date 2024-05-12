<script lang="ts">
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { UserTypes } from '@/types/users';
	import { cn } from '@/utils';
	import { CircleAlert } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { ZodError, z } from 'zod';
	import { changePasswordAllowCloseState, changePasswordModalState } from './state';

	export let user: UserTypes.AuthorizedUser | null;
	let formErrors:
		| {
				[x: string]: string[] | undefined;
				[x: number]: string[] | undefined;
				[x: symbol]: string[] | undefined;
		  }
		| undefined
		| null;
	let formSuccess: boolean | undefined;

	onMount(async () => {
		changePasswordModalState.set(false);
		if (user?.forcePasswordChange) {
			changePasswordModalState.set(true);
			changePasswordAllowCloseState.set(false);
		}
	});

	$: if (formSuccess) {
		toast.success('Password changed successfully');
		changePasswordModalState.close();
	}

	const changePasswordFormSchema = z
		.object({
			currentPassword: z
				.string({
					required_error: 'Current Password is required',
					invalid_type_error: 'Current Password must be a string of alphanumeric characters'
				})
				.min(1, { message: 'Current Password is required' })
				.min(8, { message: 'Current Password must be at least 8 characters' })
				.trim(),
			newPassword: z
				.string({
					required_error: 'New Password is required',
					invalid_type_error: 'New Password must be a string of alphanumeric characters'
				})
				.min(1, { message: 'New Password is required' })
				.min(8, { message: 'New Password must be at least 8 characters' })
				.trim(),
			confirmPassword: z
				.string({
					required_error: 'Confirm password is required',
					invalid_type_error: 'Password must be a string of alphanumeric characters'
				})
				.min(1, { message: 'Confirm password is required' })
				.min(8, { message: 'Confirm Password must be at least 8 characters' })
				.trim()
		})
		.superRefine(({ newPassword, confirmPassword }, ctx: z.RefinementCtx) => {
			if (newPassword != confirmPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'New Password and Confirm Password must match',
					path: ['confirmPassword']
				});
			}
		});

	const processChangePasswordFormEvent = async (data: FormData) => {
		const formData = Object.fromEntries(data);
		try {
			const validatedFormData = changePasswordFormSchema.parse(formData);
			return {
				success: true,
				data: validatedFormData,
				errors: null
			};
		} catch (e) {
			if (e instanceof ZodError) {
				const { fieldErrors: errors } = e.flatten();
				return {
					success: false,
					data: null,
					errors: errors
				};
			}
		}
	};

	const formSubmission = async (event: Event) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const results = await processChangePasswordFormEvent(formData);
		formErrors = results?.errors;
		if (results?.success && results.data) {
			const response = await fetch(`${PUBLIC_SITE_URL}/api/dashboard/change-password`, {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				formSuccess = true;
			}
		}
	};


</script>

<Dialog.Root
	closeOnEscape={$changePasswordAllowCloseState}
	closeOnOutsideClick={$changePasswordAllowCloseState}
	open={$changePasswordModalState}
	onOpenChange={(isOpen) => {}}
>
	<Dialog.Content class="sm:max-w-[425px] max-h-screen overflow-y-scroll ">
		<Dialog.Header>
			<Dialog.Title>Change Password</Dialog.Title>
			<Dialog.Description>
				Your account security is important to us. Please update your password regularly to keep your
				account safe.
			</Dialog.Description>
		</Dialog.Header>
		<form on:submit={formSubmission}>
			<div class="grid w-full items-center gap-6">
				<div class="flex flex-col space-y-3">
					<Label for="currentPassword">Current Password</Label>
					<Input
						type="password"
						name="currentPassword"
						id="currentPassword"
						placeholder="Current Password"
						value=""
					/>
					<Label for="currentPasswordError" class={cn('flex items-center gap-1 text-xs')}>
						{#if formErrors != null && formErrors != undefined && formErrors.currentPassword}
							<div class="flex flex-col">
								{#each formErrors.currentPassword as error, i}
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
					<Label for="newPassword">New Password</Label>
					<Input type="password" name="newPassword" id="newPassword" placeholder="New Password" />
					<Label for="newPasswordError" class={cn('flex items-center gap-1 text-xs')}>
						{#if formErrors != null && formErrors != undefined && formErrors.newPassword}
							<div class="flex flex-col">
								{#each formErrors.newPassword as error, i}
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
					<Label for="confirmPassword">Cornfirm Password</Label>
					<Input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						placeholder="Confirm Password"
					/>
					<Label for="confirmPasswordError" class={cn('flex items-center gap-1 text-xs')}>
						{#if formErrors != null && formErrors != undefined && formErrors.confirmPassword}
							<div class="flex flex-col">
								{#each formErrors.confirmPassword as error, i}
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
			<Dialog.Footer class={cn(`${$changePasswordAllowCloseState && 'pt-2 lg:gap-1 gap-2'}`)}>
				{#if $changePasswordAllowCloseState}
					<Button
						type="button"
						variant="secondary"
						on:click={() => {
							changePasswordModalState.close();
						}}>Cancel</Button
					>
				{/if}
				<Button
					type="submit"
					on:click={() => {
						console.log(formErrors);
						if (formErrors != null && formErrors != undefined && !user?.forcePasswordChange)
							changePasswordModalState.close();
					}}>Save changes</Button
				>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
