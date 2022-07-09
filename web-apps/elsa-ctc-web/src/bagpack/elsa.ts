import axios from "axios";
import { pluck } from "ramda";

export const query = async (url: string) => {
	const out = await axios.get(url, {
		baseURL: "https://bounce-edge.fly.dev",
	});

	return out.data;
};
