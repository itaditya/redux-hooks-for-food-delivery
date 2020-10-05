import { useQuery } from 'react-query';

import { useDietStore, useCartStore } from './zustand';
import { loadFoodData } from './utils';

export function useLoadFoodQuery() {
  const menuQuery = useQuery('menu', loadFoodData);
  return menuQuery;
}

export function useMenuList() {
  const diet = useDietStore((state) => state.diet);
  const menuQuery = useLoadFoodQuery();

  const data = menuQuery.data || [];

  const menuList = data.filter((item) => {
    if (diet === 'all') {
      return item;
    }

    return item.diet === diet;
  });

  return menuList;
}

export function useCartPrice() {
  const cartByIds = useCartStore((state) => state.cartByIds);
  const menuList = useMenuList();

  let cartPrice = 0;
  menuList.forEach((item) => {
    const cartItem = cartByIds[item.id] || { quantity: 0 };
    cartPrice += item.price * cartItem.quantity;
  });

  return cartPrice;
}
