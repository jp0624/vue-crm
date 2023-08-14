<template>
	<div>
		<Header @open="showModal = true" />
		<article>
			<ul class="client_list">
				<li class="client_list__row">
					<div class="card__headings">
						<div class="card__headings--first_name">First Name</div>
						<div class="card__headings--last_name">Last Name</div>
						<div class="card__headings--phone">Phone Number</div>
						<div class="card__headings--email">Email Address</div>
						<div class="card__headings--btns">
							<button
								class="card__headings--btns--add"
								@click="showModal = true"
							>
								<span class="material-symbols-rounded"
									>add</span
								>
								<span>New Client</span>
							</button>
						</div>
					</div>
				</li>
				<li
					v-for="client in clientList"
					:key="client.id"
					class="client_list__row"
				>
					<ClientCard :client="client" />
				</li>
			</ul>
		</article>
		<!-- <pre>{{ clientList }}</pre> -->
		<Footer />
		<teleport to="#modal">
			<MainModal v-show="showModal" @close="showModal = false">
				<AddClient @close="showModal = false" />
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
import ClientCard from "./components/cards/ClientCard.vue"

export default {
	name: "App",
	components: {
		Header,
		Footer,
		AddClient,
		MainModal,
		ClientCard,
	},
	setup() {
		const clientList = ref([])
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
		return { clientList, showModal, AddClient, ClientCard }
	},
}
</script>

<style lang="scss" scoped>
.client_list {
	.client_list__row {
		.card__headings {
			color: #fff;
			font-weight: 400;
			background: #a8a8a8;
			background: linear-gradient(
				to bottom,
				#a8a8a8 0%,
				#636363 58%,
				#494949 100%
			);
			&--btns {
				text-align: center;
				button {
					display: inline-flex;
					text-align: center;
					align-items: center;
					justify-content: center;
					margin: 0 0.25rem;
					color: #fff;
					border: none;
					outline: none;
					border-radius: 0.5rem;
					padding: 0.25rem 0.5rem;
					text-shadow: -1px -1px 2px rgba(0, 0, 0, 0.25);
					box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.25);
				}
				&--add {
					background-color: #32a852;
				}
			}
		}
		.card__headings,
		.card__client {
			display: grid;
			grid-auto-flow: column;
			grid-auto-columns: 1fr 1fr 1fr 2fr;
			text-align: center;
			align-items: center;
			justify-content: center;
			margin: 0.5rem;
			border-radius: 0.5rem;
			div {
				padding: 1rem 0;
			}
		}
	}
}
</style>
