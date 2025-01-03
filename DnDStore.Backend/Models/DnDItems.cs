// Models/DndItem.cs
public class DndItem
{
    public int Id { get; set; }  // Database primary key
    public string Index { get; set; }  // D&D API index
    public string Name { get; set; }
    public List<string> Description { get; set; }
    public List<string> Special { get; set; }
    public EquipmentCategory EquipmentCategory { get; set; }
    public string WeaponCategory { get; set; }
    public string WeaponRange { get; set; }
    public string CategoryRange { get; set; }
    public Cost Cost { get; set; }
    public Damage Damage { get; set; }
    public Range Range { get; set; }
    public double Weight { get; set; }
    public List<Property> Properties { get; set; }
    public Range ThrowRange { get; set; }
    public string Url { get; set; }
    public List<string> Contents { get; set; }

    // Additional shop-specific properties
    public int StockQuantity { get; set; }
    public bool IsAvailable { get; set; }
    public DateTime? LastRestockDate { get; set; }
}