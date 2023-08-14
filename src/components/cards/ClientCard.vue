<template>
	<!-- Client Card -->
	<div class="card__client" @click.stop="$emit('activeClient', client)">
		<!-- Client Details -->
		<div class="card__client--first_name">{{ client.first_name }}</div>
		<div class="card__client--last_name">{{ client.last_name }}</div>
		<div class="card__client--phone">{{ client.phone }}</div>
		<div class="card__client--email">{{ client.email }}</div>

		<!-- Buttons for Edit and Delete -->
		<div class="card__client--btns">
			<!-- Edit Button -->
			<button
				class="card__client--btns--edit material-symbols-rounded"
				@click="$emit('activeClient', client)"
			>
				edit_note
			</button>

			<!-- Delete Button -->
			<button
				class="card__client--btns--delete material-symbols-rounded"
				@click="deleteClient(client.id)"
			>
				close
			</button>
		</div>
	</div>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../helpers/dbConnect"

export default {
	name: "ClientCard",
	props: ["client"],

	setup() {
		// Function to delete a client
		function deleteClient(id) {
			deleteDoc(doc(db, "crm-db", id))
		}

		return { deleteClient }
	},
}
</script>

<style lang="scss" scoped>
.card {
	/* Client Card Styles */
	&__client {
		position: relative;
		background: #f0f9ff; /* Old browsers */
		background: linear-gradient(
			to bottom,
			#f0f9ff 0%,
			#e2e2e2 47%,
			#cccccc 100%
		);

		/* Buttons Styles */
		&--btns {
			button {
				margin: 0.25rem;
				color: #fff;
				border: none;
				outline: none;
				border-radius: 0.5rem;
				padding: 0.25rem 0.5rem;
				text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.25);
				box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
			}

			/* Edit Button Styles */
			&--edit {
				background-color: #323ea8;
			}

			/* Delete Button Styles */
			&--delete {
				background-color: #a83232;
			}
		}

		/* Client Detail Styles */
		div {
			color: #333;
			padding: 1rem 0;

			text-overflow: ellipsis;
			overflow: hidden;
		}

		@import "../../styles/_media";
		@include mq(md) {
			div {
				padding: 0.25rem 0;
				&.card__client--first_name,
				&.card__client--last_name {
					padding-left: 2.5rem;
				}
				&.card__client--btns {
					padding: 0;
				}
			}
			padding: 1rem;
			grid-gap: 0px;
			grid-template-columns: [col] 25% [col] 25% [col] 25% [col] 25%;
			grid-template-rows: [row] auto [row] auto [row];
			&--first_name {
				grid-column: col / span 2;
				grid-row: row 1;
			}
			&--last_name {
				grid-column: col 1 / span 2;
				grid-row: row 2;
			}
			&--phone {
				grid-column: col 3 / span 2;
				grid-row: row 1;
			}
			&--email {
				grid-column: col 3 / span 2;
				grid-row: row 2;
			}
			&--btns {
				position: absolute;
				width: 5rem;
				left: -0.5rem;
				button {
					display: inline-block;
				}
			}
		}
	}
}
</style>
