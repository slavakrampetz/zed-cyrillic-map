const copyByApi = async (text: string): Promise<boolean | string> => {
	if (!navigator.clipboard) {
		return false;
	}
	try {
		await navigator.clipboard.writeText(text);
	} catch (error) {
		if (error instanceof Error) {
			return error.message;
		}
		if (error) {
			return String(error);
		}
		return `unknown error "${error}"`;
	}
	return true;
};

let buffer: HTMLTextAreaElement | undefined;

const ensureBuffer = (text: string) => {
	if (!buffer) {
		buffer = document.createElement("textarea");
		buffer.setAttribute("readonly", "");
		buffer.style.position = "absolute";
		buffer.style.left = "-9999px";
	}

	document.body.append(buffer);
	buffer.value = text;
	buffer.select();
};

const clearBuffer = (): void => {
	if (!buffer) {
		return;
	}
	buffer.remove();
};

const copyLegacy = (text: string): boolean => {
	// Save selection
	const selection = document.getSelection();
	const hasSelect = selection !== null;
	let selected: Range | undefined;
	if (hasSelect && selection.rangeCount > 0) {
		selected = selection.getRangeAt(0);
	}

	ensureBuffer(text);

	try {
		// ts-ignore
		document.execCommand("copy");
	} catch {
		console.error("Failed copy to clipboard in both ways :(");
		return false;
	} finally {
		clearBuffer();
	}

	if (selected) {
		selection?.removeAllRanges();
		selection?.addRange(selected);
	}
	return true;
};

export const tryToCopy = async (text: string): Promise<boolean | string> => {
	const result1 = await copyByApi(text);
	if (result1 !== true) {
		return copyLegacy(text);
	}
	return true;
};
