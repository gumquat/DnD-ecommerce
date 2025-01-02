// Types for the D&D 5e API response
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

interface WeaponProperty {
  index: string;
  name: string;
  url: string;
}

interface Range {
  normal: number;
  long?: number;
}

interface ThrowRange {
  normal: number;
  long: number;
}

interface DaggerEquipment {
  _id: string;
  index: string;
  name: string;
  equipment_category: EquipmentCategory;
  weapon_category: string;
  weapon_range: string;
  category_range: string;
  cost: Cost;
  damage: Damage;
  range: Range;
  weight: number;
  properties: WeaponProperty[];
  throw_range: ThrowRange;
  url: string;
  desc?: string[];
}

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DisplayDagger: React.FC = () => {
  const [dagger, setDagger] = useState<DaggerEquipment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDagger = async () => {
      try {
        const response = await fetch(
          "https://www.dnd5eapi.co/api/equipment/dagger"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dagger data");
        }
        const data: DaggerEquipment = await response.json();
        setDagger(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDagger();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        Error: {error}
      </div>
    );
  }

  if (!dagger) {
    return (
      <div className="alert alert-info m-4" role="alert">
        No dagger information available
      </div>
    );
  }

  return (
    <div className="card mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card-header bg-dark text-white">
        <h4 className="card-title mb-0">{dagger.name}</h4>
        <small className="text-light">{dagger.equipment_category.name}</small>
      </div>

      <div className="card-body">
        {/* Cost and Weight */}
        <div className="d-flex justify-content-between mb-3">
          <span className="fw-bold">
            Cost: {dagger.cost.quantity} {dagger.cost.unit}
          </span>
          <span className="fw-bold">Weight: {dagger.weight} lb</span>
        </div>

        {/* Damage Information */}
        <div className="mb-3">
          <h5 className="fw-bold">Damage</h5>
          <div className="d-flex gap-2">
            <span className="badge bg-secondary">
              {dagger.damage.damage_dice}
            </span>
            <span className="badge bg-info">
              {dagger.damage.damage_type.name}
            </span>
          </div>
        </div>

        {/* Weapon Categories */}
        <div className="mb-3">
          <h5 className="fw-bold">Categories</h5>
          <div className="d-flex gap-2">
            <span className="badge bg-secondary">{dagger.weapon_category}</span>
            <span className="badge bg-info">{dagger.weapon_range}</span>
          </div>
        </div>

        {/* Properties */}
        <div className="mb-3">
          <h5 className="fw-bold">Properties</h5>
          <div className="d-flex flex-wrap gap-2">
            {dagger.properties.map((prop) => (
              <span key={prop.index} className="badge bg-primary">
                {prop.name}
              </span>
            ))}
          </div>
        </div>

        {/* Range Information */}
        <div className="mb-3">
          <h5 className="fw-bold">Range</h5>
          <div className="d-flex gap-2">
            <span className="badge bg-secondary">
              Normal: {dagger.range.normal} ft
            </span>
            {dagger.throw_range && (
              <>
                <span className="badge bg-info">
                  Throw (Normal): {dagger.throw_range.normal} ft
                </span>
                <span className="badge bg-info">
                  Throw (Long): {dagger.throw_range.long} ft
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        {dagger.desc && dagger.desc.length > 0 && (
          <div className="mb-3">
            <h5 className="fw-bold">Description</h5>
            {dagger.desc.map((desc, index) => (
              <p key={index} className="small text-muted">
                {desc}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayDagger;
