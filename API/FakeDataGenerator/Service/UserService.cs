using Contracts;
using CsvHelper;
using Service.IService;
using System.Globalization;
using System.Diagnostics;
using Entities;
using Entities.Models;
using System.Text;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IUserDataRepository _userDataRepository;

        public UserService (IUserDataRepository userDataRepository)
        {
            _userDataRepository = userDataRepository;
        }

        public async Task<byte[]> GenerateCsvData(IEnumerable<UserData> usersData)
        {
            await using var memoryStream = new MemoryStream();    
                
            await using var writer = new StreamWriter(memoryStream, Encoding.UTF8);
    
            await using (var csvWriter = new CsvWriter(writer, CultureInfo.InvariantCulture))   
            {                    
                csvWriter.Context.RegisterClassMap<MappingCsvProfile>();

                await csvWriter.WriteRecordsAsync(usersData);
                                        
                writer.Flush();
    
                return memoryStream.ToArray();
            }
        }

        public IEnumerable<UserData> GetUserData(RequestParameters requestParameters, int PageSize)
        {
            return _userDataRepository.GetUserData(requestParameters, PageSize);
        }
    }
}