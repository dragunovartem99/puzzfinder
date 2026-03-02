export type Shortcut = {
	label: string;
	icon: string;
	url: string;
	onclick?: () => void;
};

// can be extended to a union
type WindowID = "puzzfinder";

export type Window = {
	id: WindowID;
	title: string;
	statusBar: string[];
	controls: Partial<{
		close: boolean;
	}>;
};
