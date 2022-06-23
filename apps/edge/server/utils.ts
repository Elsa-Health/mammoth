import * as fs from "fs/promises";
import * as path from "path";

/**
 * Mega class to handle light folder stuff
 * @param folder Folder to save stuff to
 * @returns functions to hadle contents
 */
export const saver = (folder: string) => ({
	async path(filePath: string) {
		const path_ = path.join("./", folder, filePath);
		await fs.mkdir(path.dirname(path_), { recursive: true });
		return path_;
	},
	async asJSON(filePath: string, contents: object) {
		await fs.writeFile(await this.path(filePath), JSON.stringify(contents));
	},
});
