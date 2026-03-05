export type Tab = {
	label: string;
	id: string;
};

export type Option = {
	label: string;
	key: string;
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
	statusBar: string[];
	controls: Partial<{
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
	gameUrl: string;
	flipped: boolean;
	rating: number;
	themes: string;
	duration: string;
};
