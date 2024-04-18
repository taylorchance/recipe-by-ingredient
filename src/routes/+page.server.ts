import { collection, query, getDocs } from 'firebase/firestore'
import { firestore } from '$lib/firebase'

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const q = query(collection(firestore, 'recipes'))
  const querySnapshot = await getDocs(q)
  let ingredients = []

  querySnapshot.docs.forEach((doc) => {
    ingredients.push(...doc.data().recipeIngredient)
  })

  return {
    ingredients
  }
}