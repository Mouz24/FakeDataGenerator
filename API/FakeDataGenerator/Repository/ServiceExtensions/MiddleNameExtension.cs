using Bogus;
using Entities;

namespace Repository.ServiceExtensions
{
    public static class MiddleNameExtension
    {
        public static string GetGenderisedMiddleName(this Bogus.Person person, string locale, Randomizer randomizer)
        {
            if (locale != Regions.ru.ToString())
            {
                return "";
            }

            return randomizer.ArrayElement(File.ReadAllLines(Path.Combine($"Resources/{locale}_{person.Gender}.txt")));
        }
    }
}
