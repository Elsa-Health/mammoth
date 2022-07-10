import axios from "axios";
import { pluck } from "ramda";

export const query = async (url: string) => {
	const out = await axios.get(url, {
		baseURL: "https://bounce-edge.fly.dev",
	});

	return out.data;
};

const data = (m: any) => m.result.data;
const dt = <T>(m: { data: T }) => m.data as T;
export const queryData = async <T>(url: string) => {
	const data_ = await query(url);
	return dt<T>(data(data_));
};
