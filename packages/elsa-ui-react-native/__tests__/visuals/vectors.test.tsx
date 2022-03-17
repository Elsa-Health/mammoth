import React from "react";
import { render } from "@testing-library/react-native";
import {
	ElsaIcon,
	ElsaColorableIcon,
	ArchiveIcon,
	ArrowBackIcon,
	ArrowDownIcon,
	CheckCircleIcon,
	CheckIcon,
	ChevronDownIcon,
	ExclamationIcon,
	EyeIcon,
	InformationIcon,
	LibraryIcon,
	MenuAltIcon,
	MenuIcon,
	NextIcon,
	PencilAltIcon,
	PlusIcon,
	PreviousIcon,
	SearchIcon,
	SettingsIcon,
	TrashIcon,
	XCircleIcon,
	XIcon,
} from "../visuals/vectors";

describe("Icons", () => {
	it("ElsaIcon", () => {
		render(<ElsaIcon />);
	});
	it("ElsaColorableIcon", () => {
		render(<ElsaColorableIcon />);
	});
	it("ArrowBackIcon", () => {
		render(<ArrowBackIcon />);
	});
	it("PlusIcon", () => {
		render(<PlusIcon />);
	});
	it("XIcon", () => {
		render(<XIcon />);
	});
	it("SearchIcon", () => {
		render(<SearchIcon />);
	});
	it("NextIcon", () => {
		render(<NextIcon />);
	});
	it("PreviousIcon", () => {
		render(<PreviousIcon />);
	});
	it("MenuIcon", () => {
		render(<MenuIcon />);
	});
	it("TrashIcon", () => {
		render(<TrashIcon />);
	});
	it("CheckIcon", () => {
		render(<CheckIcon />);
	});
	it("CheckCircleIcon", () => {
		render(<CheckCircleIcon />);
	});
	it("EyeIcon", () => {
		render(<EyeIcon />);
	});
	it("XCircleIcon", () => {
		render(<XCircleIcon />);
	});
	it("MenuAltIcon", () => {
		render(<MenuAltIcon />);
	});
	it("SettingsIcon", () => {
		render(<SettingsIcon />);
	});
	it("ArchiveIcon", () => {
		render(<ArchiveIcon />);
	});
	it("ChevronDownIcon", () => {
		render(<ChevronDownIcon />);
	});
	it("ExclamationIcon", () => {
		render(<ExclamationIcon />);
	});
	it("InformationIcon", () => {
		render(<InformationIcon />);
	});
	it("LibraryIcon", () => {
		render(<LibraryIcon />);
	});
	it("PencilAltIcon", () => {
		render(<PencilAltIcon />);
	});
	it("ArrowDownIcon", () => {
		render(<ArrowDownIcon />);
	});
});
