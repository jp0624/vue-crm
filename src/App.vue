<template>
	<div>
		<!-- <template v-if="alertMessage"> -->
		<div class="alert-message" :class="alertMessage ? 'show' : 'hide'">
			<h3>{{ alertMessage }}</h3>
		</div>
		<!-- </template> -->
		<Header />
		<article>
			<ClientList @open="openModal" />
		</article>
		<Footer />
		<teleport to="#modal">
			<MainModal v-show="showModal" @close="closeModal">
				<template v-if="showModal === 'addClient'">
					<ClientModal
						@close="closeModal"
						@alert="showAlert"
						:client="activeClient"
					/>
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
		let alertMessage = ref("")

		function closeModal() {
			showModal.value = false
			activeClient.value = []
		}
		function openModal(name, value = false) {
			showModal.value = name
			if (!!value && name === "addClient") {
				activeClient.value = value
			}
		}
		function showAlert(message) {
			alertMessage.value = message
			setTimeout(() => {
				alertMessage.value = ""
			}, 3000)
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
			showAlert,
			alertMessage,
			activeClient,
			clientList,
			showModal,
			ClientModal,
			ClientList,
		}
	},
}
</script>

<style lang="scss" scoped>
.alert-message {
	width: 100%;
	background: #32a852;
	height: 2.5rem;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
	font-size: 1.25rem;
	font-weight: 400;
	color: #fff;
	position: fixed;
	z-index: 1;
	transform: translate(0%, -100%);
	transition: 250ms ease-in-out all;
	&.show {
		transform: translate(0%, 0%);
	}
}
</style>
