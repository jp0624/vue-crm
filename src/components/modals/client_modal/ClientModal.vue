<template>
	<form @submit.prevent="updateClient" id="form_addClient">
		<h2>{{ client.id ? "Update" : "Create New" }} Client</h2>
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
		<button type="submit">
			{{ client.id ? "Update" : "Create" }} Client
		</button>
		<!-- <a @click="clearForm">Clear Form</a> -->
		<!-- <span>{{ client }}</span> -->
	</form>
</template>

<script>
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { toRefs, ref, reactive, inject, onMounted, computed } from "vue"
import { db } from "../../helpers/dbConnect"
export default {
	name: "ClientModal",
	props: ["client"],
	emits: ["close"],
	setup(props, context) {
		const clientData = inject("selectedClient")
		const newClient = ref(true)
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
		async function addClient() {
			addDoc(collection(db, "crm-db"), state)
			clearForm()
			console.log(`ADD Client ${state}`)
		}
		function clearForm() {
			document.forms["form_addClient"].reset()
		}
		const state = reactive({
			id: "",
			first_name: "",
			last_name: "",
			email: "",
			phone: "",
			notes: "",
		})
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
	display: flex;
	flex-direction: column;

	h2 {
		color: #000;
		font-size: 1.5rem;
		border-bottom: #999 solid 1px;
		margin-bottom: 1rem;
	}
	label {
		margin: 0.5rem 0 0;
		color: #a83232;
	}
	input,
	textarea {
		padding: 0.25rem 0.5rem;
		margin: 0.25rem 0;
		height: 2rem;
		border-radius: 0.5rem;
		border: 1px solid #9999;
	}
	button {
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
