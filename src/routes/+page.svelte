<script lang="ts">
import { docStore, Collection } from 'sveltefire'
import { collectionStore } from 'sveltefire'
import { firestore } from '$lib/firebase'
import { collection, where, query } from 'firebase/firestore'

// const recipes = collectionStore(firestore, 'recipes')
// console.log('recipes', recipes)

// let search = 'Caramelized Shallot Pasta'
let search: string = ''

// const recipesRef = collection(firestore, 'recipes')
// // const q = query(recipesRef, where('name', '==', search))
// // const q = query(recipesRef, where('recipeIngredient', 'array-contains', search))
// const q = query(recipesRef,
// 	where('name', '>=', search),
//   where('name', '<=', search+ '\uf8ff')
// )
// const res = collectionStore(firestore, q)

const handleSubmit = () => {

}
</script>

<svelte:head>
	<title>What to make with</title>
	<meta name="description" content="What to make with" />
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title">
			Lookup an ingredient to find some recipes
		</h1>

		<div class="field">
			<input class="input" bind:value={search} />
			<button class="button mt-3" on:click={handleSubmit}>Search!</button>
		</div>

		<!-- {#each $res as recipe}
			<p>{recipe.name}</p>
		{/each} -->

		<Collection ref={'recipes'} let:data={recipes}>
			<!-- {recipes} -->
			{#each recipes as recipe}
				<p>{recipe.name}</p>
			{/each}
		</Collection>

		search? {search}
	</div>
</section>
