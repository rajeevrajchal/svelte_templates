<script lang="ts">
	import { Button, Checkbox, Pane, Slider, Text } from 'svelte-tweakpane-ui';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';
	import { DEFAULT_TWEAK_STATE } from '@modules/tweak-pane/tweak-state';

	interface Props {
		showDebugGrid?: boolean;
		showDebugLayout?: boolean;
		contentMaxWidth?: number;
	}

	let {
		showDebugGrid = $bindable(DEFAULT_TWEAK_STATE.showDebugGrid),
		showDebugLayout = $bindable(DEFAULT_TWEAK_STATE.showDebugLayout),
		contentMaxWidth = $bindable(DEFAULT_TWEAK_STATE.contentMaxWidth)
	}: Props = $props();

	function resetControls(): void {
		showDebugGrid = DEFAULT_TWEAK_STATE.showDebugGrid;
		showDebugLayout = DEFAULT_TWEAK_STATE.showDebugLayout;
		contentMaxWidth = DEFAULT_TWEAK_STATE.contentMaxWidth;
	}
</script>

<Pane position="draggable" title="Tweak" expanded={true} width={300}>
	<Text value={`${innerWidth.current} X ${innerHeight.current}`} label="Size" disabled />
	<Checkbox bind:value={showDebugLayout} label="Debug Layout" />
	<Checkbox bind:value={showDebugGrid} label="Debug Grid" />
	<Slider bind:value={contentMaxWidth} label="Max Width" min={640} max={1440} step={20} />
	<Button title="Reset" on:click={resetControls} />
</Pane>
