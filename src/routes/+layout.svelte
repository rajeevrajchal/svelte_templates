<script lang="ts">
	import '@styles/css/reset.css';
	import '@styles/css/global.css';

	import favicon from '@assets/favicon.svg';
	import Debug from '@modules/tweak-pane/debug.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main class="app-content">
	{@render children()}
</main>
<Debug />
