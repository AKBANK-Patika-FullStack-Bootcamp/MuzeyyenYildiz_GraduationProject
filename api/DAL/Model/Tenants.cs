

namespace DAL.Model
{
    public class Tenants
    {
        public int Id { get; set; }
        public string?  UserType { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string TcNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string? NumberPlate { get; set; }
        public int PaymentId { get; set; }
        public int UserLoginId { get; set; }
        public int AdminLoginId { get; set; }
    }
}
