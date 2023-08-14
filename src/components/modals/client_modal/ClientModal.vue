<template>
	<!-- Client Form -->
	<form @submit.prevent="updateClient" id="form_addClient">
		<!-- Form Title -->
		<h2>{{ client.id ? "Update" : "Create New" }} Client</h2>

		<!-- First Name Input -->
		<label for="first_name">First Name</label>
		<input
			type="text"
			name="First Name"
			id="first_name"
			placeholder="First Name"
			v-model="first_name"
		/>

		<!-- Last Name Input -->
		<label for="last_name">Last Name</label>
		<input
			type="text"
			name="Last Name"
			id="last_name"
			placeholder="First Name"
			v-model="last_name"
		/>

		<!-- Email Input -->
		<label for="email">Email</label>
		<input
			type="email"
			name="Email"
			id="email"
			placeholder="Email Address"
			v-model="email"
		/>

		<!-- Phone Input -->
		<label for="phone">Phone</label>
		<input
			type="phone"
			name="Phone"
			id="phone"
			placeholder="Phone"
			v-model="phone"
		/>

		<!-- Notes Textarea -->
		<label for="notes">Notes</label>
		<textarea
			type="text"
			id="notes"
			placeholder="Notes"
			v-model="notes"
		></textarea>

		<!-- Submit Button -->
		<button type="submit">
			{{ client.id ? "Update" : "Create" }} Client
		</button>

		<!-- Clear Form Link -->
		<!-- <a @click="clearForm">Clear Form</a> -->

		<!-- Debug: Display Client Data -->
		<!-- <span>{{ client }}</span> -->
	</form>
</template>

<script>
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { toRefs, ref, reactive, inject, onMounted } from "vue"
import { db } from "../../helpers/dbConnect"

export default {
	name: "ClientModal",
	props: ["client"],
	emits: ["close"],

	setup(props, context) {
		// Inject selected client data
		const clientData = inject("selectedClient")

		// State for new client detection
		const newClient = ref(true)

		// Function to update a client
		async function updateClient() {
			if (!!state.id) {
				updateDoc(doc(db, "crm-db", state.id), state)
				context.emit("close")
				context.emit("alert", "Client Updated successfully")
			} else {
				addClient()
				context.emit("close")
				context.emit("alert", "Client Added successfully")
			}
		}

		// Function to add a new client
		async function addClient() {
			addDoc(collection(db, "crm-db"), state)
			clearForm()
			console.log(`ADD Client ${state}`)
		}

		// Function to clear form inputs
		function clearForm() {
			document.forms["form_addClient"].reset()
		}

		// Reactive state for form inputs
		const state = reactive({
			id: "",
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			notes: "",
		})

		// On component mount, populate form with client data if provided
		onMounted(() => {
			state.id = props.client.id || ""
			state.first_name = props.client.first_name || ""
			state.last_name = props.client.last_name || ""
			state.email = props.client.email || ""
			state.phone = props.client.phone || ""
			state.notes = props.client.notes || ""
		})

		return {
			clientData,
			clearForm,
			updateClient,
			addClient,
			...toRefs(state),
		}
	},
}
</script>

<style lang="scss" scoped>
form {
	/* Form Styling */
	display: flex;
	flex-direction: column;

	h2 {
		/* Form Title Styling */
		color: #000;
		font-size: 1.5rem;
		border-bottom: #999 solid 1px;
		margin-bottom: 1rem;
	}

	label {
		/* Label Styling */
		margin: 0.5rem 0 0;
		color: #a83232;
	}

	input,
	textarea {
		/* Input and Textarea Styling */
		padding: 0.25rem 0.5rem;
		margin: 0.25rem 0;
		height: 2rem;
		border-radius: 0.5rem;
		border: 1px solid #9999;
	}

	button {
		/* Button Styling */
		background-color: #32a852;
		color: #fff;
		outline: none;
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem 0.5rem;
		display: inline-block;
		margin-top: 1rem;
	}
}
</style>
