using DAL.Model;
using EFLibCore;
using System.Linq;



namespace SiteManagementAPI.Controllers
{
    public class DBApartmentsOperations
    {
        private SiteContext _context = new SiteContext();

        public bool AddModel(Apartments _apart)
        {
                _context.Apartments.Add(_apart);
                _context.SaveChanges();
                return true;
        }

       
        public List<Apartments> GetApartments()
        {
            List<Apartments> apartments = new List<Apartments>();
            apartments = _context.Apartments.ToList();
            return apartments;
        }

        
        public bool DeleteModel(int Id)
        {
                _context.Apartments.Remove(FindApartment(0, "" ,Id));
                _context.SaveChanges();
                return true;
        }
     
        public bool Update(int Id, Apartments _apart)
        {
            var existapart = _context.Apartments.FirstOrDefault(w => w.Id == Id);
            if (existapart == null)
            {
                return false;
            }
            else
            {
                existapart.Status = _apart.Status;
                existapart.TenantsId = _apart.TenantsId;
                _context.SaveChanges();
                return true;
            }
        }
      
        public Apartments FindApartment(int Number = 0, string Blok = "", int Id = 0)
        {
            Apartments? _apart = new Apartments();
            if (Number > 0 && !string.IsNullOrEmpty(Blok))
                _apart = _context.Apartments.FirstOrDefault(m => m.Number == Number && m.Blok == Blok);
            else if (Id > 0)
            {
                _apart = _context.Apartments.FirstOrDefault(m => m.Id == Id);
            }
            return _apart;
        }

    }
}

