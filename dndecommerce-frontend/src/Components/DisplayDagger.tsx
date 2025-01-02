import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DaggerDisplay = () => {
  const [dagger, setDagger] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDagger = async () => {
      try {
        const response = await fetch(
          "https://www.dnd5eapi.co/api/equipment/dagger"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch dagger data");
        }
        const data = await response.json();
        setDagger(data);
      } catch (err) {
        setError(err.message);
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

export default DaggerDisplay;
