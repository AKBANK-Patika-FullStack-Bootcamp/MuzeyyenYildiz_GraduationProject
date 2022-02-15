using Microsoft.AspNetCore.Mvc;
using DAL.Model;

namespace SiteManagementAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TenantsController : ControllerBase
    {
        Result _result = new Result();
        DBTenantsOperations dbOperation = new DBTenantsOperations();

        /// <summary>
        /// Get Tenants List
        /// </summary>
        /// <returns></returns>
        [HttpGet] // Works
        public List<Tenants> GetTenants()
        {
            return dbOperation.GetTenants();
        }

       /// <summary>
       /// Get Tenant by Id
       /// </summary>
       /// <param name="id"></param>
       /// <returns></returns>
        [HttpGet("{id}")] //Works
        public Tenants GetTenantsById(int id)
        {
            Tenants resultObject = dbOperation.FindTenants("", "", id);
            return resultObject;
        }

        /// <summary>
        /// Add new Wine to WineList
        /// </summary>
        /// <param name="_"></param>
        /// <returns></returns>
        [HttpPost]  //Works
        public Result Post(Tenants _tenant)
        {
            Tenants? Rtenant = dbOperation.FindTenants(_tenant.Name, _tenant.LastName, _tenant.Id);
            bool tenantCheck = (Rtenant != null) ? true : false;

            if (tenantCheck == false)
            {
                if (dbOperation.AddModel(_tenant) == true)
                {
                    _result.status = 1;
                    _result.Message = "New tenant added to list.";
                }
                else
                {
                    _result.status = 0;
                    _result.Message = "Error, Tenant can not add to list.";
                }
            }
            else
            {
                _result.status = 0;
                _result.Message = "This tenant is already on the list! ";
            }
            return _result;
        }


        [HttpPut("{tenantId}")]  //Works
        public Result Update(int tenantId, Tenants newTenant)
        {

            bool Tenant = dbOperation.Update(Id: tenantId , _tenant: newTenant);
            if (Tenant == true)
            {
                _result.status = 1;
                _result.Message = "Changes have been made successfully!";
            }
            else
            {
                _result.status = 0;
                _result.Message = "Tenant Not found!";
            }

            return _result;
        }


    }
}