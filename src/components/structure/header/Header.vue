<template>
	<header>
		<button @click="$emit('open')">Add Client</button>
		{{ header }}
	</header>
</template>

<script>
export default {
	name: "Header",
	emits: ["open"],
	setup() {
		const header = "Header Introduction"

		return {
			header,
		}
	},
}
</script>

<style lang="scss" scoped></style>
