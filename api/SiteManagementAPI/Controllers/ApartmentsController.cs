using Microsoft.AspNetCore.Mvc;
using DAL.Model;
using Microsoft.AspNetCore.Authorization;

namespace SiteManagementAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class ApartmentsController : ControllerBase
    {
        Result _result = new Result();
        DBApartmentsOperations dbOperation = new DBApartmentsOperations();


        /// <summary>
        /// Get Wine List 
        /// </summary>
        /// <returns></returns>
        [HttpGet] // Works
        public List<Apartments> GetApartment()
        {
            return dbOperation.GetApartments();
        }

        /// <summary>
        /// Get only one Wine by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")] //Works
        public Apartments GetApartById(int id)
        {
            Apartments resultObject = dbOperation.FindApartment(0, "", id);
            return resultObject;
        }

        /// <summary>
        /// Add new Wine to WineList
        /// </summary>
        /// <param name="wine"></param>
        /// <returns></returns>
        [HttpPost]  //Works
        public Result Post(Apartments _apart)
        {
            Apartments? Rapartment = dbOperation.FindApartment(_apart.Number, _apart.Blok, _apart.Id);
            bool apartCheck = (Rapartment != null) ? true : false;

            if (apartCheck == false)
            {
                if (dbOperation.AddModel(_apart) == true)
                {
                    _result.status = 1;
                    _result.Message = "New apartment added to list.";
                }
                else
                {
                    _result.status = 0;
                    _result.Message = "Error, Apartment can not add to list.";
                }
            }
            else
            {
                _result.status = 0;
                _result.Message = "This apartment is already on the list! ";
            }
            return _result;
        }

       
        [HttpPut("{apartId}")]  //Works
        public Result Update(int apartId, Apartments newApart)
        {

            bool Apart = dbOperation.Update(Id: apartId, _apart: newApart);
            if (Apart == true)
            {
                _result.status = 1;
                _result.Message = "Changes have been made successfully!";
            }
            else
            {
                _result.status = 0;
                _result.Message = "Apartment Not found!";
            }

            return _result;
        }


    }
}