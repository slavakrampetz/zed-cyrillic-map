import { CYRILLIC_MAP } from "./bindings";

type ConvertKeyResult = {
	changed: boolean;
	result: string;
};

const splitLines = (src: string): string[] => {
	return src.split(/\r?\n/);
};

const convertKey = (key: string): ConvertKeyResult => {
	const rxKey = /^(?<p>[a-z\- ]+\-)?(?<k>[a-z\`;',\.\[\]])$/i;

	const nope = {
		changed: false,
		result: key,
	};
	const m = key.match(rxKey);
	if (!m) {
		return nope;
	}

	const k = m?.groups?.k || "";
	if (!Object.keys(CYRILLIC_MAP).includes(k)) {
		return nope;
	}

	const pfx = m?.groups?.p || "";
	const mapped = CYRILLIC_MAP[k];
	const result = `${pfx}${mapped}`;

	return {
		changed: true,
		result,
	};
};

export const convertKeys = (key: string): ConvertKeyResult => {
	if (key.indexOf(" ") === -1) {
		return convertKey(key);
	}

	const parts = key.split(" ");
	const combined: string[] = [];
	const result = {
		changed: false,
		result: key,
	};
	for (const k in parts) {
		const res = convertKey(parts[k]);
		if (!res.changed) {
			combined.push(k);
		} else {
			result.changed = true;
			combined.push(res.result);
		}
	}
	if (result.changed) {
		result.result = combined.join(" ");
	}
	return result;
};

export const convertLine = (line: string): ConvertKeyResult => {
	// Fill line like
	//   \t\t\t"ctrl-shift-z": "editor::Redo",
	//
	// or quited key with possible space
	//   "ctrl-shift-z"
	const rxFull = /^(?<a>\s*)"(?<k>[^"]+)"(?<b>:\s*"\w+::\w+"\s*,)?\s*$/m;
	const mFull = rxFull.exec(line);

	if (mFull !== null) {
		const partA = mFull?.groups?.a || "";
		const partB = mFull?.groups?.b || "";
		const key = mFull?.groups?.k || "";
		const { changed, result } = convertKeys(key);
		if (!changed) {
			return {
				changed: false,
				result: line,
			};
		}
		return {
			changed: true,
			result: `${partA}"${result}"${partB}`,
		};
	}

	// Simple key
	const { changed, result } = convertKeys(line);
	if (!changed) {
		return {
			changed: false,
			result: line,
		};
	}
	return {
		changed,
		result,
	};
};

export const convertBindings = (src: string): string => {
	const lines = splitLines(src);
	const converted: string[] = [];
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const res = convertLine(line);
		if (res.changed === false) {
			converted.push(line);
		} else {
			converted.push(line);
			converted.push(res.result);
		}
	}

	return converted.join("\n");
};
