import { DEFAULT_TWEAK_STATE, type TweakState } from './tweak-state';

class TweakPaneStore {
	public showDebugGrid = $state<boolean>(DEFAULT_TWEAK_STATE.showDebugGrid);
	public showDebugLayout = $state<boolean>(DEFAULT_TWEAK_STATE.showDebugLayout);
	public contentMaxWidth = $state<number>(DEFAULT_TWEAK_STATE.contentMaxWidth);
	public designOverlayImageUrl = $state<string>(DEFAULT_TWEAK_STATE.designOverlayImageUrl);
	public designOverlayOpacity = $state<number>(DEFAULT_TWEAK_STATE.designOverlayOpacity);
}

export const tweakPaneStore = new TweakPaneStore();
