using DAL.Model;
using EFLibCore;
using System.Linq;



namespace SiteManagementAPI.Controllers
{
    public class DBTenantsOperations
    {
        private SiteContext _context = new SiteContext();

        public bool AddModel(Tenants _tenant)
        {
            _context.Tenants.Add(_tenant);
            _context.SaveChanges();
            return true;
        }


        public List<Tenants> GetTenants()
        {
            List<Tenants> tenants = new List<Tenants>();
            tenants = _context.Tenants.ToList();
            return tenants;
        }


        public bool DeleteModel(int Id)
        {
            _context.Tenants.Remove(FindTenants("", "", Id));
            _context.SaveChanges();
            return true;
        }

        public bool Update(int Id, Tenants _tenant)
        {
            var existTenant = _context.Tenants.FirstOrDefault(w => w.Id == Id);
            if (existTenant == null)
            {
                return false;
            }
            else
            {
                existTenant.Name = _tenant.Name;
                existTenant.LastName = _tenant.LastName;
                existTenant.TcNumber = _tenant.TcNumber;
                existTenant.PhoneNumber = _tenant.PhoneNumber;
                existTenant.NumberPlate = _tenant.NumberPlate;
                existTenant.PaymentId = _tenant.PaymentId;
                existTenant.UserLoginId = _tenant.UserLoginId;
                _context.SaveChanges();
                return true;
            }
        }

        public Tenants FindTenants(string Name="", string LastName = "", int Id = 0)
        {
            Tenants? _tenant = new Tenants();
            if (!string.IsNullOrEmpty(Name) && !string.IsNullOrEmpty(LastName))
                _tenant = _context.Tenants.FirstOrDefault(m => m.Name == Name && m.LastName == LastName);
            else if (Id > 0)
            {
                _tenant = _context.Tenants.FirstOrDefault(m => m.Id == Id);
            }
            return _tenant;
        }

    }
}

