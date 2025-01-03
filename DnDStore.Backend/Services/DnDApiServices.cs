// Services/DndApiService.cs
public class DndApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl = "https://www.dnd5eapi.co";

    public DndApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri(_baseUrl);
    }

    public async Task<DndItem> GetItemAsync(string index)
    {
        var response = await _httpClient.GetAsync($"/api/equipment/{index}");
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<DndItem>(content);
    }

    public async Task<List<DndItem>> GetAllEquipmentAsync()
    {
        var response = await _httpClient.GetAsync("/api/equipment");
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var equipment = JsonSerializer.Deserialize<ApiResponse>(content);

        var items = new List<DndItem>();
        foreach (var result in equipment.Results)
        {
            var item = await GetItemAsync(result.Index);
            items.Add(item);
        }

        return items;
    }
}