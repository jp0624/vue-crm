<template>
	<form @submit.prevent="addClient" id="form_addClient">
		<h2>Add Client</h2>
		<label for="first_name">First Name</label>
		<input
			type="text"
			name="First Name"
			id="first_name"
			placeholder="First Name"
			v-model="first_name"
		/>
		<label for="last_name">Last Name</label>
		<input
			type="text"
			name="Last Name"
			id="last_name"
			placeholder="First Name"
			v-model="last_name"
		/>
		<label for="email">Email</label>
		<input
			type="email"
			name="Email"
			id="email"
			placeholder="Email Address"
			v-model="email"
		/>
		<label for="phone">Phone</label>
		<input
			type="phone"
			name="Phone"
			id="phone"
			placeholder="Phone"
			v-model="phone"
		/>
		<label for="notes">Notes</label>
		<textarea
			type="text"
			id="notes"
			placeholder="Notes"
			v-model="notes"
		></textarea>
		<button type="submit">Add Client</button>
		<a @click="clearForm">Clear Form</a>
	</form>
</template>

<script>
import { collection, addDoc } from "firebase/firestore"
import { toRefs, reactive } from "vue"
import { db } from "../../helpers/dbConnect"
export default {
	name: "ClientModal",
	// emits: ["close"],
	setup() {
		async function addClient() {
			addDoc(collection(db, "crm-db"), state)
			clearForm()
			// $emit("close")
			console.log(`ADD Client ${state}`)
		}
		function clearForm() {
			document.forms["form_addClient"].reset()
		}
		const state = reactive({
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			notes: "",
		})

		return {
			clearForm,
			addClient,
			...toRefs(state),
		}
	},
}
</script>

<style lang="scss" scoped>
form {
	display: flex;
	flex-direction: column;

	h2 {
		color: #000;
		font-size: 1.5rem;
	}
	label {
		margin: 0.25rem 0;
	}
	input,
	textarea {
		margin: 0.25rem 0;
	}
}
</style>
