<template>
	<!-- Modal Overlay -->
	<div class="modal-overlay" @click.self="$emit('close')">
		<!-- Modal Content -->
		<div class="modal-content customScroll">
			<!-- Close Button -->
			<button
				@click.self="$emit('close')"
				class="material-symbols-rounded"
			>
				Close
			</button>

			<!-- Slot for Dynamic Content -->
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "Modal",
	emits: ["close"],
}
</script>

<style lang="scss" scoped>
.modal-overlay {
	/* Modal Overlay Styling */
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: grid;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.3);

	.modal-content {
		/* Modal Content Styling */
		padding: 20px;
		background: #fff;
		border-radius: 2px;
		display: inline-block;
		height: auto;
		max-height: 80%;
		overflow-y: scroll;
		position: relative;
		width: 500px;
		max-width: 70%;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		justify-self: center;

		button {
			/* Close Button Styling */
			background-color: #333;
			color: #fff;
			border-radius: 5rem;
			height: 30px;
			width: 30px;
			padding: 0;
			position: absolute;
			top: 5px;
			right: 5px;
		}
	}
}
</style>
