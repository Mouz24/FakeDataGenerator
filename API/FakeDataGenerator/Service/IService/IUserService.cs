using Contracts;
using Entities.Models;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CsvHelper;

namespace Service.IService
{
    public interface IUserService
    {
        public IEnumerable<UserData> GetUserData(RequestParameters requestParameters, int PageSize);

        public Task<byte[]> GenerateCsvData(IEnumerable<UserData> users);
    }
}
