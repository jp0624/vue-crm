<template>
	<div>
		<Header />
		<article>
			<ClientList @open="openModal" /><!-- showModal = 'addClient'" /> -->
		</article>
		<!-- <pre>{{ clientList }}</pre> -->
		<Footer />
		<teleport to="#modal">
			<MainModal v-show="showModal" @close="closeModal">
				<ClientModal
					v-show="showModal === 'addClient'"
					@close="closeModal"
					:activeClient="activeClient"
				/>
			</MainModal>
		</teleport>
	</div>
</template>

<script>
import { ref, onMounted, reactive, provide } from "vue"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./components/helpers/dbConnect"
import Header from "./components/structure/header/Header.vue"
import Footer from "./components/structure/footer/Footer.vue"
import MainModal from "./components/modals/main_modal/MainModal.vue"
import ClientList from "./components/panels/client_list/ClientList.vue"
import ClientModal from "./components/modals/client_modal/ClientModal.vue"

export default {
	name: "App",
	components: {
		Header,
		Footer,
		ClientModal,
		MainModal,
		ClientList,
	},
	setup() {
		const clientList = ref([])
		let activeClient = ref([])
		let showModal = ref(false)

		function closeModal() {
			console.log("close")
			showModal.value = false
			activeClient = []
		}
		function openModal(name) {
			showModal.value = name
			console.log("event: ", name)
		}
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
				console.log("clientsList: ", clientList.value)
			})
		})
		provide("fullClientList", clientList)
		return {
			closeModal,
			activeClient,
			clientList,
			showModal,
			ClientModal,
			ClientList,
			openModal,
		}
	},
}
</script>

<style lang="scss" scoped></style>
