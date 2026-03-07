export type Tab = {
	label: string;
	id: string;
};

export type Option = {
	label: string;
	key: string;
};

export type OptionGroup = {
	label: string;
	options: Option[];
};

export type Link = {
	label: string;
	url: string;
};

export type Shortcut = Link & {
	icon: string;
	onclick?: () => void;
};

export type Window = {
	title: string;
	controls?: Partial<{
		close: boolean;
	}>;
};

export type AppWindow = Window & {
	id: "puzzfinder";
};

export type Puzzle = {
	id: string;
	fen: string;
	url: string;
	flipped: boolean;
	rating: number;
	duration: string;
};
