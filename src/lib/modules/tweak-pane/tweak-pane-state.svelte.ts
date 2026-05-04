import {
	DEFAULT_TWEAK_STATE,
	applyTweakStateToDocument,
	loadTweakState,
	saveTweakState,
	type TweakState
} from './tweak-state';

class TweakPaneStore {
	showDebugGrid = $state<boolean>(DEFAULT_TWEAK_STATE.showDebugGrid);
	showDebugLayout = $state<boolean>(DEFAULT_TWEAK_STATE.showDebugLayout);
	contentMaxWidth = $state<number>(DEFAULT_TWEAK_STATE.contentMaxWidth);
	showDesignOverlay = $state<boolean>(DEFAULT_TWEAK_STATE.showDesignOverlay);
	designOverlayImageUrl = $state<string>(DEFAULT_TWEAK_STATE.designOverlayImageUrl);
	designOverlayOpacity = $state<number>(DEFAULT_TWEAK_STATE.designOverlayOpacity);

	private isHydrated = false;
	private isEffectRegistered = false;

	get snapshot(): TweakState {
		return {
			showDebugGrid: this.showDebugGrid,
			showDebugLayout: this.showDebugLayout,
			contentMaxWidth: this.contentMaxWidth,
			showDesignOverlay: this.showDesignOverlay,
			designOverlayImageUrl: this.designOverlayImageUrl,
			designOverlayOpacity: this.designOverlayOpacity
		};
	}

	applyState(state: TweakState): void {
		this.showDebugGrid = state.showDebugGrid;
		this.showDebugLayout = state.showDebugLayout;
		this.contentMaxWidth = state.contentMaxWidth;
		this.showDesignOverlay = state.showDesignOverlay;
		this.designOverlayImageUrl = state.designOverlayImageUrl;
		this.designOverlayOpacity = state.designOverlayOpacity;
	}

	initialize(): void {
		if (typeof window === 'undefined') return;

		if (!this.isHydrated) {
			const loaded = loadTweakState();
			this.applyState(loaded);
			applyTweakStateToDocument(loaded);
			this.isHydrated = true;
		}

		if (!this.isEffectRegistered) {
			$effect(() => {
				const state = this.snapshot;
				if (!this.isHydrated) return;
				saveTweakState(state);
				applyTweakStateToDocument(state);
			});
			this.isEffectRegistered = true;
		}
	}
}

export const tweakPaneStore = new TweakPaneStore();
