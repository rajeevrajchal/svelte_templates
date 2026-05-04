<script lang="ts">
	import { onMount } from 'svelte';
	import DebugGridOverlay from './debug-grid-overlay.svelte';
	import DebugLayoutOverlay from './debug-layout-overlay.svelte';
	import TweakPane from './tweak-pane.svelte';
	import { dev } from '$app/environment';
	import { tweakPaneStore } from './tweak-pane-state.svelte.ts';
	import DebugDesignOverlay from './debug-design-overlay.svelte';

	onMount(() => {
		tweakPaneStore.initialize();
	});
</script>

{#if dev}
	<DebugGridOverlay visible={tweakPaneStore.showDebugGrid} />
	<DebugLayoutOverlay visible={tweakPaneStore.showDebugLayout} targetSelector=".app-content" />
	<DebugDesignOverlay
		imageUrl={tweakPaneStore.designOverlayImageUrl}
		opacity={tweakPaneStore.designOverlayOpacity}
	/>
	<TweakPane
		bind:showDebugGrid={tweakPaneStore.showDebugGrid}
		bind:showDebugLayout={tweakPaneStore.showDebugLayout}
		bind:contentMaxWidth={tweakPaneStore.contentMaxWidth}
	/>
{/if}
