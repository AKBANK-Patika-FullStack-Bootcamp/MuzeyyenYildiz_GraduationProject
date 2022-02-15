using DAL.Model;
using EFLibCore;
using System.Linq;



namespace SiteManagementAPI.Controllers
{
    public class DBPaymentOperations
    {
        private SiteContext _context = new SiteContext();

        public bool AddModel(Payment _payment)
        {
            _context.Payment.Add(_payment);
            _context.SaveChanges();
            return true;
        }


        public List<Payment> GetPayments()
        {
            List<Payment> payment = new List<Payment>();
            payment = _context.Payment.ToList();
            return payment;
        }


        public bool DeleteModel(int Id)
        {
            _context.Payment.Remove(FindPayment(Id));
            _context.SaveChanges();
            return true;
        }

        public bool Update(int Id, Payment _payment)
        {
            var existPayment = _context.Payment.FirstOrDefault(w => w.Id == Id);
            if (existPayment == null)
            {
                return false;
            }
            else
            {
                existPayment.Dues = _payment.Dues;
                existPayment.DuesPayed = _payment.DuesPayed;
                existPayment.ElectricityBill = _payment.ElectricityBill;
                existPayment.ElectricityBillPayed = _payment.ElectricityBillPayed;
                existPayment.GasBill = _payment.GasBill;
                existPayment.GasBillPayed  = _payment.GasBillPayed;

                _context.SaveChanges();
                return true;
            }
        }

        public Payment FindPayment(int Id = 0)
        {
            Payment? _payment = new Payment();
            if (Id > 0)
            {
                _payment  = _context.Payment.FirstOrDefault(m => m.Id == Id);
            }
            return _payment;
        }

    }
}

