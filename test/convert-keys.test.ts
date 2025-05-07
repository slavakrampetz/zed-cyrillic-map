import { describe, expect, test } from "bun:test";

import { convertKeys } from "../src/lib/convert";

describe("convertKeys", () => {
	const testConvert = (changed: boolean, src: string, result: string) => {
		const actual = convertKeys(src);

		expect(actual.changed).toBe(changed);
		if (changed) {
			expect(actual.result).toBe(result);
		}
	};

	test.each([
		[false, "", ""],
		[false, "   ", "   "],
		[false, "\t", "\t"],
		[false, "backspace", "backspace"],
		[false, '"backspace"', '"backspace"'],
		[false, "ctrl-backspace", "ctrl-backspace"],
		[false, "cmd-backspace", "cmd-backspace"],
		[false, '"ctrl-backspace"', '"ctrl-backspace"'],
		[true, "ctrl-z", "ctrl-cyrillic_ya"],
		[true, "ctrl-shift-z", "ctrl-shift-cyrillic_ya"],
		[true, "alt-cmd-z", "alt-cmd-cyrillic_ya"],
		[true, "alt-cmd-.", "alt-cmd-cyrillic_yu"],
		[true, "cmd-`", "cmd-cyrillic_io"],
		[true, "ctrl-;", "ctrl-cyrillic_zhe"],
		[true, "ctrl-; x", "ctrl-cyrillic_zhe cyrillic_che"],
	])("? %p: '%s' -> '%s'", testConvert);
});
