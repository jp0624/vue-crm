<template>
	<!-- List of Clients -->
	<ul class="client_list">
		<!-- Header Row -->
		<li class="client_list__row">
			<!-- Column Headings -->
			<div class="card__headings">
				<div class="card__headings--first_name">First Name</div>
				<div class="card__headings--last_name">Last Name</div>
				<div class="card__headings--phone">Phone Number</div>
				<div class="card__headings--email">Email Address</div>
				<div class="card__headings--btns">
					<!-- Add Client Button -->
					<button
						class="card__headings--btns--add"
						@click="$emit('open', 'addClient')"
					>
						<span class="material-symbols-rounded">add</span>
						<span>New Client</span>
					</button>
				</div>
			</div>
		</li>

		<!-- Client Rows -->
		<template v-if="clientList.length > 0">
			<li
				v-for="client in clientList"
				:key="client.id"
				class="client_list__row"
			>
				<ClientCard :client="client" @activeClient="editClient" />
			</li>
		</template>

		<!-- Loading Placeholder -->
		<template v-else>
			<li class="client_list__row--loading">Loading...</li>
		</template>
	</ul>
</template>

<script>
import { inject } from "vue"
import ClientCard from "../../cards/ClientCard.vue"

export default {
	name: "ClientList",
	components: {
		ClientCard,
	},
	emits: ["open"],

	setup(props, context) {
		// Inject the client list from the parent component
		const clientList = inject("fullClientList", "No Clients Found")

		// Function to edit a client
		function editClient(client) {
			context.emit("open", "addClient", client)
		}

		return {
			clientList,
			ClientCard,
			editClient,
		}
	},
}
</script>

<style lang="scss" scoped>
.client_list {
	.client_list__row {
		/* Loading Row Styles */
		&--loading {
			width: 100%;
			text-align: center;
			justify-content: center;
			height: 100%;
		}

		/* Card Headings Styles */
		.card__headings {
			color: #fff;
			font-weight: 400;
			background: #a8a8a8;
			background: linear-gradient(
				to bottom,
				#a8a8a8 0%,
				#636363 58%,
				#494949 100%
			);

			@import "../../../styles/_media";
			@include mq(md) {
				.card__headings {
					background: none;

					&--first_name,
					&--last_name,
					&--phone,
					&--email {
						display: none;
					}
				}
			}

			/* Button Container Styles */
			&--btns {
				text-align: center;

				/* Button Styles */
				button {
					display: inline-flex;
					text-align: center;
					align-items: center;
					justify-content: center;
					margin: 0 0.25rem;
					color: #fff;
					border: none;
					outline: none;
					background-color: #32a852;
					border-radius: 0.5rem;
					padding: 0.25rem 0.5rem;
					text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.25);
					box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);

					/* Add Button Styles */
					&--add {
						background-color: #32a852;
					}
				}
			}
		}

		/* Card Headings and Client Row Styles */
		.card__headings,
		.card__client {
			display: grid;
			grid-auto-flow: column;
			grid-auto-columns: 1fr 1fr 1fr 2fr;
			text-align: center;
			align-items: center;
			justify-content: center;
			margin: 0.5rem;
			border-radius: 0.5rem;

			div {
				padding: 1rem 0.25rem;
			}
		}
	}
}
</style>
