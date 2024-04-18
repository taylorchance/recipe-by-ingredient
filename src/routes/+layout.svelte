<script>
// import './bulma.css'
import './style.css'

import { firestore, auth } from '$lib/firebase'
import { FirebaseApp, User } from 'sveltefire'
</script>

<FirebaseApp {auth} {firestore}>
  <!-- <User let:user> -->
  	<slot />
  <!-- </User> -->
</FirebaseApp>
<style>
.app {
	border: 5px solid red;
}
</style>
