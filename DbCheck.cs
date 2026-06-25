using System;
using System.Linq;
using EasyEdu.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace EasyEdu
{
    public class DbCheck
    {
        public static void Run(IServiceProvider services)
        {
            using (var scope = services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                var ledgerCount = context.Ledgers.Count();
                var groupCount = context.AccountGroups.Count();
                var voucherCount = context.Vouchers.Count();
                
                Console.WriteLine($"Ledgers: {ledgerCount}");
                Console.WriteLine($"Account Groups: {groupCount}");
                Console.WriteLine($"Vouchers: {voucherCount}");
                
                if (ledgerCount > 0)
                {
                    var firstFew = context.Ledgers.Take(5).Select(l => l.Name).ToList();
                    Console.WriteLine("Sample Ledgers: " + string.Join(", ", firstFew));
                }
            }
        }
    }
}
