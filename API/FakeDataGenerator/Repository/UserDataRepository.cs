using Contracts;
using Entities.Models;
using Entities;
using Bogus;
using Bogus.DataSets;
using Address = Entities.Models.Address;
using Repository.ServiceExtensions;

namespace Repository
{
    public class UserDataRepository : IUserDataRepository
    {
        public IEnumerable<UserData> GetUserData(RequestParameters requestParameters, int PageSize)
        {
            int pageSkip = (requestParameters.PageNumber - 1) * PageSize;
            int actualPageSize = (requestParameters.PageNumber == 1) ? PageSize : 10;

            return GenerateFakeUserData(requestParameters.Seed, requestParameters.MistakesRate, requestParameters.Region.ToString())
                .GenerateForever()
                .Skip(pageSkip)
                .Take(actualPageSize)
                .ToList();
        }

        private Faker<UserData> GenerateFakeUserData(int seed, double mistakeRate, string locale)
        {
            var randomizer = new Randomizer(seed);

            var fakeAddresses = new Faker<Address>(locale).UseSeed(seed)
                .RuleFor(a => a.State, f => f.Address.State())
                .RuleFor(a => a.City, f => f.Address.City())
                .RuleFor(a => a.Street, f => f.Address.StreetAddress())
                .RuleFor(a => a.SecondAddress, f => f.Address.SecondaryAddress()); ;

            var fakeUserData = new Faker<UserData>(locale).UseSeed(seed)
                .RuleFor(u => u.Id, f => f.Finance.Account())
                .RuleFor(u => u.Gender, f => (int)f.PickRandom<Name.Gender>())
                .RuleFor(u => u.FirstName, f => f.Person.FirstName)
                .RuleFor(u => u.MiddleName, f => f.Person.GetGenderisedMiddleName(locale, randomizer))
                .RuleFor(u => u.LastName, f => f.Person.LastName)
                .RuleFor(u => u.AddressString, f => fakeAddresses.Generate().GetRandomisedAddressString(randomizer))
                .RuleFor(u => u.PhoneNumber, f => f.Phone.PhoneNumberFormat())
                .FinishWith((f, p) => p.MakeMistakes(mistakeRate, randomizer, locale));

            return fakeUserData;
        }
    }
}