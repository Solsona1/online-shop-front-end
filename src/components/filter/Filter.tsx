import { FC, useEffect, useState } from "react";
import { Category, Product } from "../../types";
import "./Filter.css";
import {
  getAllCategories,
  getProductsByCategory,
} from "../../services/ServicesMock.mock";

interface IPropsFilter {
  setResults: (array: Product[]) => void;
}

export const Filter: FC<IPropsFilter> = ({ setResults }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchedCategories = getAllCategories();
    setCategories(fetchedCategories);
  }, []);

  const handleFiltering = (categoryId: string) => {
    const fetchedProducts = getProductsByCategory(Number(categoryId));
    setResults(fetchedProducts);
  };

  return (
    <div id="filter-component">
      <label htmlFor="filter">Select a category: </label>
      <select
        name="filter"
        id="filter"
        onChange={e => handleFiltering(e.target.value)}
      >
        <option value="0">ALL</option>
        {categories.map((category: Category, k: number) => (
          <option key={k} value={category.id}>
            {category.denomination}
          </option>
        ))}
      </select>
    </div>
  );
};
