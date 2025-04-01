<template>
	<div class="window">
		<div class="title-bar">
			<div class="title-bar-text">Puzzfinder</div>
			<div class="title-bar-controls">
				<button aria-label="Close"></button>
			</div>
		</div>
		<div class="window-body">
			<p>There's so much room for activities!</p>
		</div>
	</div>
</template>

<style scoped>
.window {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 800px;
}
</style>
