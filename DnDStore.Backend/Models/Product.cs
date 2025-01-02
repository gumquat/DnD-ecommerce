using System;
using System.Collections.Generic;

namespace DnDStore.Backend.Models
{
    public class Product
    {
        public List<string> Desc { get; set; } // Descriptions
        public List<string> Special { get; set; } // Special properties
        public string Index { get; set; } // Unique identifier for the product
        public string Name { get; set; } // Name of the product
        public EquipmentCategory EquipmentCategory { get; set; } // Equipment category object
        public string WeaponCategory { get; set; } // Weapon category (e.g., Simple, Martial)
        public string WeaponRange { get; set; } // Range (e.g., Melee, Ranged)
        public string CategoryRange { get; set; } // Detailed range description
        public Cost Cost { get; set; } // Cost of the item
        public Damage Damage { get; set; } // Damage information for weapons
        public Range Range { get; set; } // Weapon range
        public double Weight { get; set; } // Weight of the item
        public List<WeaponProperty> Properties { get; set; } // Weapon properties (e.g., Finesse, Light, etc.)
        public ThrowRange ThrowRange { get; set; } // Throw range for thrown weapons
        public string Url { get; set; } // API URL for the product
        public List<object> Contents { get; set; } // Contents (if applicable, such as a collection of other items)
    }

    // Equipment category class to handle nested structure
    public class EquipmentCategory
    {
        public string Index { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    // Cost class to represent the cost structure
    public class Cost
    {
        public int Quantity { get; set; } // Quantity of the currency unit
        public string Unit { get; set; } // Currency unit (e.g., gp, sp, cp)
    }

    // Damage class to handle the damage structure
    public class Damage
    {
        public string DamageDice { get; set; } // The damage dice (e.g., "1d4")
        public DamageType DamageType { get; set; } // The damage type (e.g., "piercing")
    }

    // Damage type class
    public class DamageType
    {
        public string Index { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    // Range class to represent the range structure
    public class Range
    {
        public int Normal { get; set; } // Normal range (used in ranged weapons)
    }

    // Weapon property class for properties like finesse, light, etc.
    public class WeaponProperty
    {
        public string Index { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
    }

    // Throw range class to represent the throwing weapon range
    public class ThrowRange
    {
        public int Normal { get; set; } // Normal throw range
        public int Long { get; set; } // Long throw range
    }
}
