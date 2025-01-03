import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaCoins, FaWeight, FaDungeon } from "react-icons/fa";
import { GiDaggers } from "react-icons/gi";

interface DamageType {
  index: string;
  name: string;
  url: string;
}

interface Damage {
  damage_dice: string;
  damage_type: DamageType;
}

interface Cost {
  quantity: number;
  unit: string;
}

interface EquipmentCategory {
  index: string;
  name: string;
  url: string;
}

interface Property {
  index: string;
  name: string;
  url: string;
}

interface DndItem {
  index: string;
  name: string;
  equipment_category: EquipmentCategory;
  weapon_category?: string;
  weapon_range?: string;
  category_range?: string;
  cost: Cost;
  damage?: Damage;
  range?: {
    normal: number;
    long?: number;
  };
  weight: number;
  properties?: Property[];
  throw_range?: {
    normal: number;
    long: number;
  };
  url: string;
}

const ItemShop: React.FC = () => {
  const [items, setItems] = useState<DndItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://www.dnd5eapi.co/api/equipment");
        const data: { results: { index: string; url: string }[] } =
          await response.json();

        // Fetch detailed information for each item
        const itemDetails = await Promise.all(
          data.results.slice(0, 6).map(async (item) => {
            const detailResponse = await fetch(
              `https://www.dnd5eapi.co${item.url}`
            );
            return detailResponse.json() as Promise<DndItem>;
          })
        );

        setItems(itemDetails);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch items");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const addToCart = (item: DndItem) => {
    // TODO: Implement cart functionality
    console.log(`Added ${item.name} to cart`);
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading items...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center m-4" role="alert">
        {error}
      </div>
    );

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4 text-center">
            <FaDungeon className="me-3" />
            Magical Marketplace
          </h1>
        </div>
      </div>

      <div className="row g-4">
        {items.map((item) => (
          <div key={item.index} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <GiDaggers className="me-2" />
                  {item.name}
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <p className="d-flex align-items-center mb-2">
                    <FaCoins className="me-2 text-warning" />
                    <strong>Cost:</strong> {item.cost?.quantity}{" "}
                    {item.cost?.unit}
                  </p>
                  <p className="d-flex align-items-center mb-2">
                    <FaWeight className="me-2 text-secondary" />
                    <strong>Weight:</strong> {item.weight} lbs
                  </p>
                  {item.equipment_category && (
                    <p className="d-flex align-items-center mb-2">
                      <FaDungeon className="me-2 text-primary" />
                      <strong>Category:</strong> {item.equipment_category.name}
                    </p>
                  )}
                  {item.damage && (
                    <p className="mb-2">
                      <strong>Damage:</strong> {item.damage.damage_dice}{" "}
                      {item.damage.damage_type.name}
                    </p>
                  )}
                  {item.properties && item.properties.length > 0 && (
                    <div className="mt-2">
                      <strong>Properties:</strong>
                      <div className="mt-1">
                        {item.properties.map((prop) => (
                          <span
                            key={prop.index}
                            className="badge bg-secondary me-1 mb-1"
                          >
                            {prop.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                  onClick={() => addToCart(item)}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemShop;
