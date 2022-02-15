

namespace DAL.Model
{
    public class Apartments
    {
        public int Id { get; set; }
        public string? Blok { get; set; }
        public int Floor { get; set; }
        public int Number { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
        public int TenantsId {get; set;}

    }
}
