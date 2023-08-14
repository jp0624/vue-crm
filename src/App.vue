<template>
	<div>
		<Header @open="showModal = true" />
		<pre>{{ clientList }}</pre>
		<Footer />
		<teleport to="#modal">
			<MainModal v-show="showModal" @close="showModal = false">
				<AddClient />
			</MainModal>
		</teleport>
	</div>
</template>

<script>
import { ref, onMounted, reactive } from "vue"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./components/helpers/dbConnect"
import Header from "./components/structure/header/Header.vue"
import Footer from "./components/structure/footer/Footer.vue"
import MainModal from "./components/modals/main/MainModal.vue"
import AddClient from "./components/modals/addClient/AddClientModal.vue"

export default {
	name: "App",
	components: {
		Header,
		Footer,
		AddClient,
		MainModal,
	},
	setup() {
		const clientList = reactive({})
		const showModal = ref(false)

		onMounted(() => {
			onSnapshot(collection(db, "crm-db"), (querySnapshot) => {
				const clients = []
				querySnapshot.forEach((doc) => {
					const clientDetails = {
						id: doc.id,
						email: doc.data().email,
						first_name: doc.data().first_name,
						last_name: doc.data().last_name,
						notes: doc.data().notes,
						phone: doc.data().phone,
					}
					clients.push(clientDetails)
				})
				clientList.value = clients
				console.log("clientList: ", clientList.value)
			})
		})
		return { clientList, showModal, AddClient }
	},
}
</script>

<style scoped></style>
