<script lang="ts">
	import { tryToCopy } from "./lib/clipboard";
	import { convertBindings } from "./lib/convert";

	const COPY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><path d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z"/><path d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z"/></svg>`;

	let text = $state("");
	let converted = $state("Nothing here yet");
	let cssOut = $state("");
	let canCopy = $state(false);
	let copyFailed = $state(false);
	let copyDone = $state(false);

	const minimize = (inc: string): string => {
		return inc.replaceAll("\t", "  ");
	};

	const convert = (src: string): string => {
		let res = src.trim();
		if (res === "") {
			res = "Please paste JSON to the Source";
			cssOut = "--empty";
			canCopy = false;
			return res;
		}

		cssOut = "";
		const changed = convertBindings(res);
		canCopy = changed !== res && changed.trim() !== "";
		converted = changed;

		return changed;
	};

	const copyCss: string = $derived.by(() => {
		if (!canCopy) {
			return "--off";
		}

		if (copyFailed) {
			return "--error";
		}

		if (copyDone) {
			return "--success";
		}

		return "";
	});

	const copyResult = async (e: MouseEvent) => {
		e.preventDefault();

		if (!canCopy) {
			console.error("not changed?");
			return;
		}

		const ok = await tryToCopy(converted);
		if (!ok) {
			console.error("cannot copy :(");
			copyFailed = true;
			copyDone = false;
		} else {
			copyDone = true;
			setTimeout(() => {
				copyDone = false;
			}, 1500);
		}
	};

	$effect(() => {
		text = minimize(text);
		converted = convert(text);
	});
</script>

<section class="convert">
	<label class="head --hi" for="input">
		Paste Zed keyboard bindings JSON here
	</label>

	<div class="head --ho">
		<span>Converted</span>
		<button
			class={["copy", copyCss]}
			onclick={(e) => copyResult(e)}
			disabled={!canCopy || copyFailed}
			title="Copy to clipboard"
		>
			{@html COPY_SVG}
			<i>copy</i>
		</button>
	</div>

	<textarea tabindex="0" id="input" class="input" bind:value={text}></textarea>

	<div class="output {cssOut}">
		{converted}
	</div>
</section>

<style lang="scss">
	// Converter
	.convert {
		display: grid;
		grid-row-gap: 2px;
		grid-column-gap: 16px;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: max-content 1fr;

		.head {
			color: #666;
		}

		.copy {
			--color-copy: #666;
			--bg-copy: transparent;
			color: var(--color-copy);
			background-color: var(--bg-copy);
			border: none;
			padding: 4px 8px;
			margin-left: 8px;
			gap: 6px;
			transition:
				background-color 0.2s,
				color 0.2s;
			display: inline-flex;
			align-items: center;

			:global {
				svg {
					display: block;
					width: 16px;
					height: 16px;
					fill: currentColor;
				}
				i {
					font-style: normal;
				}
			}
			&:hover {
				--color-copy: #333;
				outline: solid 2px var(--bg-copy);
				--bg-copy: #f0f0f0;
			}
			&.--off {
				--bg-copy: #e0e0e0;
				--color-copy: #999;
			}
			&.--success {
				--color-copy: #090;
			}
		}

		.input {
			border: solid 1px #ccc;
			padding: 8px 8px;
			min-height: 300px;
			font-size: 0.9rem;
		}

		.output {
			border: solid 1px #ccc;
			padding: 8px 8px;
			background: #fff;

			font-family: monospace;
			white-space: pre-wrap;
			font-size: 0.9rem;

			&.--empty {
				color: #999;
			}
		}
	}

	@media screen and (max-width: 640px) {
		.convert {
			grid-template-columns: 1fr;
			grid-template-rows: max-content 1fr max-content 1fr;
			.input {
				grid-row: 2;
			}

			.--ho {
				padding-top: 16px;
			}
		}
	}
</style>
