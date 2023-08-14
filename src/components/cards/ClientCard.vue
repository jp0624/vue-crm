<template>
	<div class="card__client">
		<div class="card__client--first_name">{{ client.first_name }}</div>
		<div class="card__client--last_name">{{ client.last_name }}</div>
		<div class="card__client--phone">{{ client.phone }}</div>
		<div class="card__client--email">{{ client.email }}</div>
		<div class="card__client--btns">
			<button class="card__client--btns--edit material-symbols-rounded">
				edit_note
			</button>
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
		function deleteClient(id) {
			deleteDoc(doc(db, "crm-db", id))
		}

		return { deleteClient }
	},
}
</script>

<style lang="scss" scoped>
.card {
	&__client {
		background: #f0f9ff; /* Old browsers */
		background: linear-gradient(
			to bottom,
			#f0f9ff 0%,
			#e2e2e2 47%,
			#cccccc 100%
		);
		&--btns {
			button {
				margin: 0 0.25rem;
				color: #fff;
				border: none;
				outline: none;
				border-radius: 0.5rem;
				padding: 0.25rem 0.5rem;
				text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.25);
				box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
			}
			&--edit {
				background-color: #323ea8;
			}
			&--delete {
				background-color: #a83232;
			}
		}
		div {
			color: #333;
			padding: 1rem 0;
		}
	}
}
</style>
