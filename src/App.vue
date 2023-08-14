<template>
	<div>
		<Header />
		<article>
			<ClientList @open="openModal" />
		</article>
		<Footer />
		<teleport to="#modal">
			<MainModal v-show="showModal" @close="closeModal">
				<template v-if="showModal === 'addClient'">
					<ClientModal @close="closeModal" :client="activeClient" />
				</template>
			</MainModal>
		</teleport>
	</div>
</template>

<script>
import { ref, onMounted, provide } from "vue"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "./components/helpers/dbConnect"
import Header from "./components/structure/header/Header.vue"
import Footer from "./components/structure/footer/Footer.vue"
import MainModal from "./components/modals/main_modal/MainModal.vue"
import ClientList from "./components/panels/client_list/ClientListPanel.vue"
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
			activeClient.value = []
		}
		function openModal(name, value = false) {
			showModal.value = name
			if (!!value && name === "addClient") {
				activeClient.value = value
			}
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
			})
		})
		provide("fullClientList", clientList)
		return {
			openModal,
			closeModal,
			activeClient,
			clientList,
			showModal,
			ClientModal,
			ClientList,
		}
	},
}
</script>

<style lang="scss" scoped></style>
