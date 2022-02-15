

namespace DAL.Model
{
    public class Payment
    {
        public int Id { get; set; }
        public int  Dues { get; set; }
        public bool DuesPayed { get; set; }
        public int  ElectricityBill { get; set; }
        public bool ElectricityBillPayed { get; set; }
        public int GasBill { get; set; }
        public bool GasBillPayed { get; set; }
        
    }
}
