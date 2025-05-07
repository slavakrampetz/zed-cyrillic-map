<script lang="ts">
	import Converter from "./Converter.svelte";

	const gitHubTitle = "Sources at GitHub";
</script>

<main>
	<header>
		<div class="logo">
			<img src="/a/logo.svg" alt="logo" />
		</div>
		<h1><code>ZED/cyrillic</code> keyboard bindings converter</h1>
		<a
			href="https://github.com/slavakrampetz/zed-cyrillic-map"
			target="_blank"
			class="about"
			title={gitHubTitle}
		>
			<img src="/a/github.svg" alt={gitHubTitle} aria-hidden="true" />
			<span class="area-only">{gitHubTitle}</span>
		</a>
	</header>

	<Converter />
</main>

<style lang="css">
	@import "./css/reset.scss";
	@import "./css/app.scss";
	@import "./css/header.scss";
</style>
