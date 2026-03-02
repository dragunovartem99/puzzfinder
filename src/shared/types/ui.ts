export type Link = {
	url: string;
	label: string;
};

export type Shortcut = Link & {
	icon: string;
	onclick?: () => void;
};

export type Window = {
	// id can be extended to a union
	id: "puzzfinder";
	title: string;
	statusBar: string[];
	controls: Partial<{
		close: boolean;
	}>;
};

export type Tab = {
	id: string;
	label: string;
};
