// Models/CartItem.cs
public class CartItem
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public int DndItemId { get; set; }
    public int Quantity { get; set; }
    public DndItem Item { get; set; }
    public ApplicationUser User { get; set; }
}