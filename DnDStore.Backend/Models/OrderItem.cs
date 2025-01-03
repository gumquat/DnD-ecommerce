// Models/OrderItem.cs
public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int DndItemId { get; set; }
    public int Quantity { get; set; }
    public Cost PriceAtTime { get; set; }  // Stored as quantity and unit
    public DndItem Item { get; set; }
    public Order Order { get; set; }
}