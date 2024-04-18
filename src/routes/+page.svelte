<script lang="ts">
import { docStore, Collection } from 'sveltefire'
import { collectionStore } from 'sveltefire'
import { firestore } from '$lib/firebase'
import { collection, where, query } from 'firebase/firestore'

// const recipes = collectionStore(firestore, 'recipes')
// console.log('recipes', recipes)

// let search = 'Caramelized Shallot Pasta'
let search: string = ''
let searchQuery: string = ''


// const recipesRef = collection(firestore, 'recipes')
// // const q = query(recipesRef, where('name', '==', search))
// // const q = query(recipesRef, where('recipeIngredient', 'array-contains', search))
// const q = query(recipesRef,
// 	where('name', '>=', search),
//   where('name', '<=', search+ '\uf8ff')
// )
// const res = collectionStore(firestore, q)

const handleSubmit = () => {
	searchQuery = search
}



// let query = ref => ref.where('name', '==', search)


$: q = query(collection(firestore, 'recipes'),
	where('name', '==', searchQuery)
)

export let data
console.log('data', data)

const submitValue = () => {
	if (search) {
		console.log(`${search} is submitted!`);
		// setTimeout(clearInput, 1000);
	} else {
		alert("You didn't type anything.")
	}
}

let filteredIngredients = []

const filterRecipes = () => {
	console.log('filterRecipes')
	let storageArr = []
	if (search) {
		data.ingredients.forEach(ingredient => {
			// if (ingredient.toLowerCase().startsWith(search.toLowerCase())) {
			if (ingredient.toLowerCase().includes(search.toLowerCase())) {
				storageArr = [...storageArr, makeMatchBold(ingredient)]
			}
		})
	}
	filteredIngredients = storageArr
}

const makeMatchBold = (str) => {
	// replace part of (country name === inputValue) with strong tags
	let matched = str.substring(0, search.length)
	let makeBold = `<strong>${matched}</strong>`
	let boldedMatch = str.replace(matched, makeBold)
	return boldedMatch
}

let hiLiteIndex = null

const navigateList = (e) => {
	if (e.key === "ArrowDown" && hiLiteIndex <= filteredIngredients.length-1) {
		hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
	} else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
		hiLiteIndex === 0 ? hiLiteIndex = filteredIngredients.length-1 : hiLiteIndex -= 1
	} else if (e.key === "Enter") {
		setInputVal(filteredIngredients[hiLiteIndex])
	} else {
		return
	}
}

const setInputVal = (ingredient) => {
	search = ingredient.replace(/<(.)*?>/g, "")
	filteredIngredients = []
	hiLiteIndex = null
}	
</script>

<svelte:head>
	<title>What to make with</title>
	<meta name="description" content="What to make with" />
</svelte:head>

<svelte:window on:keydown={navigateList} />

<section class="section">
	<div class="container">
		<h1 class="title">
			Lookup an ingredient to find some recipes
		</h1>

		<div class="field has-addons">
			<div class="control">
				<div class={`dropdown ${filteredIngredients.length > 0 ? "is-active" : ""}`}>
					<div class="dropdown-trigger">
						<input
							class="input"
							type="text"
							placeholder="Search Recipes"
							bind:value={search} 
							on:input={filterRecipes}
						/>
					</div>
					<div class="dropdown-menu pt-0">
						<div class="dropdown-content pt-0">
							{#each filteredIngredients as ingredient, index}
								<a
									class={`dropdown-item ${index === hiLiteIndex ? "is-active" : ""}`}
									href="/"
									on:click={setInputVal(ingredient)}
								>
									{@html ingredient}
								</a>
								<!-- <Country itemLabel={recipe} highlighted={i === hiLiteIndex} on:click={() => setInputVal(recipe)} /> -->
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class="control">
				<button class="button is-info">
					Search
				</button>
			</div>
		</div>


		<!-- {#each recipes as recipe}
			<p>{recipe.name}</p>
		{/each} -->


		<!-- <Collection ref={'recipes'} query={(ref) => ref.limit(5)} let:data={recipes}> -->
		<Collection ref={'recipes'} let:data={recipes}>
		<!-- <Collection ref={q} let:data={recipes}> -->
			<div slot="loading" class="loader-wrapper">
				<div class="loader is-loading"></div>
			</div>
			{#each recipes as recipe}
				<dix class="box">
					<p class="heading">{recipe.name}</p>
					<p>{recipe.recipeCuisine}</p>
					<p>{recipe.recipeIngredient}</p>

				</dix>
			{/each}
		</Collection>

		searchQuery? {searchQuery}
	</div>
</section>
