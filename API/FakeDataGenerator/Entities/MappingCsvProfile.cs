using CsvHelper.Configuration;

namespace Entities
{
    public class MappingCsvProfile : ClassMap<UserData>
    {
        public MappingCsvProfile()
        {
            Map(u => u.Id);
            Map(u => u.FullName);
            Map(u => u.AddressString);
            Map(u => u.PhoneNumber);
        }
    }
}
