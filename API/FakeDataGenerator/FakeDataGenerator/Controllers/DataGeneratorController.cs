using Entities;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.IService;

namespace FakeDataGenerator.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class DataGeneratorController : ControllerBase
    {
        private readonly IUserService _userService;

        public DataGeneratorController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetUsers([FromQuery]RequestParameters requestParameters)
        {
            int pageSize = requestParameters.PageNumber == 1 ? 20 : 10;

            return Ok(_userService.GetUserData(requestParameters, pageSize));
        }

        [HttpPost("get-csv")]
        public async Task<IActionResult> DownloadCsvFile([FromBody] IEnumerable<UserData> usersData)
        {
            var csvData = await _userService.GenerateCsvData(usersData);

            return File(csvData, "text/csv", "users.csv");
        }
    }
}
