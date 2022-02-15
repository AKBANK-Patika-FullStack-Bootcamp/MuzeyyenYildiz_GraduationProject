using DAL.Model;
using EFLibCore;

namespace SiteManagementAPI.Controllers
{
    public class DBAuthOperations
    {
        private SiteContext _context = new SiteContext();

        public void CreateLogin(AdminLogin loginUser)
        {
            _context.AdminLogin.Add(loginUser);
            _context.SaveChanges();
        }

        public AdminLogin GetLogin(AdminLogin loginUser)
        {
            AdminLogin? admin = new AdminLogin();
            if (!string.IsNullOrEmpty(loginUser.Email)  && !string.IsNullOrEmpty(loginUser.Password))
            {
                admin = _context.AdminLogin.FirstOrDefault(m => m.Email == loginUser.Email && m.Password == loginUser.Password);
            }
            return admin;

        }
    }
}

