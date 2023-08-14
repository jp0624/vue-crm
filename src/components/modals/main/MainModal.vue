<template>
	<div class="modal-overlay" @click.self="$emit('close')">
		<div class="modal-content">
			<button @click.self="$emit('close')">Close</button>
			<hr />
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
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: grid;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.3);
}

.modal-content {
	padding: 20px;
	background: #fff;
	border-radius: 2px;
	display: inline-block;
	min-height: 300px;
	margin: 1rem;
	position: relative;
	min-width: 300px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	justify-self: center;
}
</style>
