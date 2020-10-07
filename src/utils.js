export async function loadFoodData() {
  const res = await window.fetch('/food-menu.json');
  if (!res.ok) {
    throw new Error('API failed');
  }

  const data = await res.json();
  return data;
}

export function hello() {
  
}
