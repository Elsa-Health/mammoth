type SelectInvestigationResult<T extends string> = {
	options: T[];
};

type OptionInvestigationResult<T extends string> = {
	// options: T[];
	selected: T;
};

type FieldInvestigationResult = {
	input: string;
};

type NumberInvestigationResult = {
	value: number;
};

type Investigation = { type: "polar" };
