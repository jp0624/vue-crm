<template>
	<footer>
		{{ footer }}
	</footer>
</template>

<script>
export default {
	name: "Footer",
	setup() {
		const footer = "Footer Introduction"

		return {
			footer,
		}
	},
}
</script>

<style lang="scss" scoped></style>
