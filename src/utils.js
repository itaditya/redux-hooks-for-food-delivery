export async function loadFoodData() {
  const res = await fetch('/food-menu.json');

  if (!res.ok) {
    throw new Error('API failed');
  }

  const data = await res.json();
  return data;
}
