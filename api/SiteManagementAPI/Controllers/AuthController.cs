using DAL.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SiteManagementAPI.Controllers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace JwtWebApiTutorial.Controllers
{
  
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        public static Login login = new Login();
        private readonly IConfiguration _configuration;
        private MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
        DBAuthOperations dbOperation = new DBAuthOperations();


        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("create")]
        public bool loginCreate(AdminLogin admin)
        {
            admin.Password = MD5Hash(admin.Password);
            dbOperation.CreateLogin(admin);
            return true;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromHeader] LoginDto request)
        {
            AdminLogin tokenUser = new AdminLogin();
            tokenUser.Email = request.Email;
            tokenUser.Password = MD5Hash(request.Password);

            AdminLogin result = dbOperation.GetLogin(tokenUser);

            if (result != null)
            {
                string token = CreateToken(login);
                return Ok(token);

            }
            else
            {
                return BadRequest("User does not exist or password is wrong!");
            }

        }
        [HttpGet("/jwt")]
        private string CreateToken(Login login)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, login.Email),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
        
        [HttpGet("/md5hash")]
        public string MD5Hash(string _input)
        {
            byte[] dizi = Encoding.UTF8.GetBytes(_input);
            dizi = md5.ComputeHash(dizi);
            StringBuilder sb = new StringBuilder();
            foreach (byte ba in dizi)
            {
                sb.Append(ba.ToString("x2").ToLower());
            }
            return sb.ToString();
        }
    }
}

