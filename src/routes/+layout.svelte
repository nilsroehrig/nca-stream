<script lang="ts">
	import '@picocss/pico';

	let { children } = $props();
</script>

<header class="container">
	<nav>
		<ul>
			<li><strong>NCA Stream</strong></li>
		</ul>
	</nav>
</header>

<main class="container">
	{@render children()}
</main>
