import type { MenuCategoryDto } from '../../../../core/application/dtos/restaurant/MenuCategoryDto';
import { ProductCard } from '../ProductCard/ProductCard';
import './MenuCategory.css';

interface MenuCategoryProps {
    category: MenuCategoryDto;
}

export const MenuCategory = ({ category }: MenuCategoryProps) => {
    return (
        <div className="menu-category mb-5">
            <h3 className="category-title fw-bold mb-4 pb-2 border-bottom">
                {category.name}
            </h3>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {category.products.map((product) => (
                    <div key={product.id} className="col">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};
