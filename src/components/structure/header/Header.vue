<template>
	<!-- Header Section -->
	<header class="header">
		<!-- Main Logo Link -->
		<a href="./" class="logo__main">
			<!-- Logo Image -->
			<img src="/assets/img/logo/logo-horz.svg" />
		</a>
	</header>
</template>

<script>
export default {
	name: "Header",
	setup() {
		// Header Introduction for documentation
		const header = "Header Introduction"

		return {
			header,
		}
	},
}
</script>

<style lang="scss" scoped>
.header {
	/* Header Styling */
	display: flex;
	flex-direction: row;
	background-color: #111;
	border-bottom: 2px solid rgba(130, 130, 130, 255);
	box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.25);

	.logo {
		&__main {
			/* Main Logo Styling */
			height: 100%;
			width: 15rem;
			display: flex;
			position: relative;
			align-items: center;
			justify-content: center;

			/* Logo Image Styling */
			img {
				height: 50%;
				position: relative;
				display: inline-flex;
			}
		}
	}
}
</style>
