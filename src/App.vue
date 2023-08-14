<template>
	<div>
		<!-- Alert Message -->
		<div class="alert-message" :class="alertMessage ? 'show' : 'hide'">
			<h3>{{ alertMessage }}</h3>
		</div>

		<!-- Header Component -->
		<Header />

		<!-- Main Content -->
		<article>
			<!-- Client List Panel -->
			<ClientList @open="openModal" />
		</article>

		<!-- Footer Component -->
		<Footer />

		<!-- Main Modal (Teleport) -->
		<teleport to="#modal">
			<MainModal v-show="showModal" @close="closeModal">
				<!-- Conditional Rendering of Client Modal -->
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
		// Reactive Variables
		const clientList = ref([])
		let activeClient = ref([])
		let showModal = ref(false)
		let alertMessage = ref("")

		// Function to Close Modal
		function closeModal() {
			showModal.value = false
			activeClient.value = []
		}

		// Function to Open Modal
		function openModal(name, value = false) {
			showModal.value = name
			if (!!value && name === "addClient") {
				activeClient.value = value
			}
		}

		// Function to Show Alert Message
		function showAlert(message) {
			alertMessage.value = message
			setTimeout(() => {
				alertMessage.value = ""
			}, 3000)
		}

		// Fetch Client List from Firebase on Mount
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

		// Provide Client List to Components
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
/* Styling for Alert Message */
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
