<script lang="ts">
	import {
		Button,
		Checkbox,
		File,
		Pane,
		Separator,
		Slider,
		type FileValue
	} from 'svelte-tweakpane-ui';

	import { DEFAULT_TWEAK_STATE } from '@modules/tweak-pane/tweak-state';

	interface Props {
		showDebugGrid?: boolean;
		showDebugLayout?: boolean;
		contentMaxWidth?: number;
		designOverlayImageUrl?: string;
		designOverlayOpacity?: number;
	}

	let {
		showDebugGrid = $bindable(DEFAULT_TWEAK_STATE.showDebugGrid),
		showDebugLayout = $bindable(DEFAULT_TWEAK_STATE.showDebugLayout),
		contentMaxWidth = $bindable(DEFAULT_TWEAK_STATE.contentMaxWidth),
		designOverlayImageUrl = $bindable(DEFAULT_TWEAK_STATE.designOverlayImageUrl),
		designOverlayOpacity = $bindable(DEFAULT_TWEAK_STATE.designOverlayOpacity)
	}: Props = $props();

	let designFile = $state<FileValue>(undefined);

	$effect(() => {
		if (designFile instanceof globalThis.File) {
			const url = URL.createObjectURL(designFile);
			designOverlayImageUrl = url;
			return () => URL.revokeObjectURL(url);
		} else {
			designOverlayImageUrl = '';
		}
	});

	const clearDesignImage = () => {
		designFile = undefined;
		designOverlayOpacity = 0.5;
	};

	function resetControls(): void {
		showDebugGrid = DEFAULT_TWEAK_STATE.showDebugGrid;
		showDebugLayout = DEFAULT_TWEAK_STATE.showDebugLayout;
		contentMaxWidth = DEFAULT_TWEAK_STATE.contentMaxWidth;
	}
</script>

<Pane position="draggable" title="Tweak" expanded={true} width={300}>
	<Checkbox bind:value={showDebugGrid} label="Debug Grid" />
	<Checkbox bind:value={showDebugLayout} label="Debug Layout" />

	<Separator />
	<File bind:value={designFile} label="Image" extensions={['.png', '.jpg', '.jpeg']} rows={2} />
	<Slider
		bind:value={designOverlayOpacity}
		label="Opacity"
		min={0}
		max={1}
		step={0.01}
		disabled={!designOverlayImageUrl}
	/>
	<Button title="Clear image" on:click={clearDesignImage} disabled={!designFile} />

	<Slider bind:value={contentMaxWidth} label="Max Width" min={640} max={1440} step={20} />
	<Separator />
	<Button title="Reset" on:click={resetControls} />
</Pane>
