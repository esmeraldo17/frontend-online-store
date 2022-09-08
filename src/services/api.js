export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const categories = await response.json();
  return categories;
  // Implemente aqui
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const objJson = await response.json();
  return objJson;
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
