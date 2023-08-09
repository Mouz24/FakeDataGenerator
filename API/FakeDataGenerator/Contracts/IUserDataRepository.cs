using Entities;
using Entities.Models;

namespace Contracts
{
    public interface IUserDataRepository
    {
        public IEnumerable<UserData> GetUserData(RequestParameters requestParameters, int PageSize);
    }
}