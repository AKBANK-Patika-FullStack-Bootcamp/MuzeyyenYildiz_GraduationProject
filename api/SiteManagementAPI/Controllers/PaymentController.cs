using Microsoft.AspNetCore.Mvc;
using DAL.Model;

namespace SiteManagementAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaymentController : ControllerBase
    {
        Result _result = new Result();
        DBPaymentOperations dbOperation = new DBPaymentOperations();

        
        [HttpGet] // Works
        public List<Payment> GetPayments()
        {
            return dbOperation.GetPayments();
        }


        [HttpGet("{id}")] //Works
        public Payment GetPaymentsById(int id)
        {
            Payment resultObject = dbOperation.FindPayment(id);
            return resultObject;
        }


       
        [HttpPost]  //Works
        public Result Post(Payment _payment)
        {
            Payment? Rpayment = dbOperation.FindPayment( _payment.Id);
            bool paymentCheck = (Rpayment != null) ? true : false;

            if (paymentCheck == false)
            {
                if (dbOperation.AddModel(_payment) == true)
                {
                    _result.status = 1;
                    _result.Message = "New payment added to list.";
                }
                else
                {
                    _result.status = 0;
                    _result.Message = "Error, Payment can not add to list.";
                }
            }
            else
            {
                _result.status = 0;
                _result.Message = "This payment is already on the list! ";
            }
            return _result;
        }


        [HttpPut("{paymentId}")]  //Works
        public Result Update(int paymentId, Payment newPayment)
        {

            bool payment = dbOperation.Update(Id: paymentId, _payment: newPayment);
            if (payment == true)
            {
                _result.status = 1;
                _result.Message = "Changes have been made successfully!";
            }
            else
            {
                _result.status = 0;
                _result.Message = "Payment Not found!";
            }

            return _result;
        }


    }
}