export type Shortcut = {
	label: string;
	icon: string;
	url?: string;
	onclick?: () => void;
};

type Controls = {
	close: boolean;
};

export type Window = {
	title: string;
	controls?: Partial<Controls>;
	statusBar?: string[];
};
