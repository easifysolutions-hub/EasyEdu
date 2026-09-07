using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using EasyEdu.Data;
using EasyEdu.Models;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Localization;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Server=(localdb)\\mssqllocaldb;Database=EasyEdu;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=True";

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders()
.AddClaimsPrincipalFactory<CustomUserClaimsPrincipalFactory>();

// Configure Cookie Authentication
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.LogoutPath = "/Account/Logout";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.ExpireTimeSpan = TimeSpan.FromHours(12);
    options.SlidingExpiration = true;
});

// Configure JWT Authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.ASCII.GetBytes(jwtSettings["Key"] ?? "SecretKeyMustBeLongEnoughForJwtSigning");

builder.Services.AddAuthentication(options =>
{
    // Keeping Cookie as default for Web, but adding JWT for API
    // We will use [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] for API
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Add MVC and API controllers
builder.Services.AddControllersWithViews();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Add Localization - specify the Resources folder for RESX files
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

// Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "EasyEdu API",
        Version = "v1",
        Description = "Comprehensive School & College Management System API",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "EasyEdu",
            Email = "support@easyedu.com"
        }
    });
});

// Add Session support
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Add CORS for mobile apps
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMobileApps", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "EasyEdu API v1");
        c.RoutePrefix = "api-docs";
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// app.UseHttpsRedirection();
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseStaticFiles();

// --- Localization Middleware ---
// Supported cultures: English (default), Hindi, Kannada, Tamil, Telugu
var supportedCultures = new[]
{
    new CultureInfo("en"),
    new CultureInfo("hi"),
    new CultureInfo("kn"),
    new CultureInfo("ta"),
    new CultureInfo("te")
};

app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture("en"),
    SupportedCultures = supportedCultures,
    SupportedUICultures = supportedCultures,
    // Cookie provider first so user's selected language persists across sessions
    RequestCultureProviders = new List<IRequestCultureProvider>
    {
        new CookieRequestCultureProvider(),
        new QueryStringRequestCultureProvider(),
        new AcceptLanguageHeaderRequestCultureProvider()
    }
});
// --- End Localization ---



app.UseRouting();

app.UseCors("AllowMobileApps");

app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

// Map MVC routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

// Map API routes
app.MapControllers();



// Seed default roles and admin user
bool isDesignTime = Environment.GetEnvironmentVariable("ASPNETCORE_PREVENTHOSTSTARTUP") == "true";
if (!isDesignTime)
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var context = services.GetRequiredService<ApplicationDbContext>();

            // Ensure database is migrated
            await context.Database.MigrateAsync();

            await SeedDashboardData(context);
            await SeedRolesAndAdmin(roleManager, userManager);

            // Update Fees Settings menu URL if it is a placeholder hashtag
            var feesSettingsMenus = await context.MenuItems.Where(m => m.Name == "Fees Settings" && m.Url == "#").ToListAsync();
            if (feesSettingsMenus.Any())
            {
                foreach (var menu in feesSettingsMenus)
                {
                    menu.Url = "/Finance/BulkInvoicePrintSettings";
                }
                await context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred while seeding the database.");
        }
    }
}

app.Run("http://0.0.0.0:5004");

// Seed Dashboard Data
async Task SeedDashboardData(ApplicationDbContext context)
{
    if (!context.Notices.Any())
    {
        var notices = new List<Notice>
        {
            new Notice { Title = "Teacher-Parent Academic Symposium", Description = "A meeting to discuss academic objectives and collaborative goals.", NoticeDate = DateTime.Parse("2023-12-12"), PublishOn = DateTime.Parse("2023-12-12") },
            new Notice { Title = "National Day Celebration", Description = "Join the festivities at EasyEdu Academy on December 16th.", NoticeDate = DateTime.Parse("2023-12-12"), PublishOn = DateTime.Parse("2023-12-12") },
            new Notice { Title = "ICT Training Program", Description = "Innovative ICT training program for teachers and students.", NoticeDate = DateTime.Parse("2023-12-12"), PublishOn = DateTime.Parse("2023-12-12") },
            new Notice { Title = "Uniform Compliance Reminder", Description = "Proper school uniform policy while on campus.", NoticeDate = DateTime.Parse("2023-12-12"), PublishOn = DateTime.Parse("2023-12-12") },
            new Notice { Title = "Campus Security Enhancement", Description = "Updated security measures for students and staff.", NoticeDate = DateTime.Parse("2023-12-12"), PublishOn = DateTime.Parse("2023-12-12") },
            new Notice { Title = "Winter Vacation Announcement", Description = "Winter Vacation 2024 is scheduled from December 16 to December 27.", NoticeDate = DateTime.Parse("2023-12-12"), PublishOn = DateTime.Parse("2023-12-12") }
        };
        context.Notices.AddRange(notices);
        await context.SaveChangesAsync();
    }

    if (!context.Companies.Any())
    {
        var company = new Company
        {
            Name = "University Of Mysore",
            Email = "info@uni-mysore.ac.in",
            Phone = "+91-821-2419361",
            Address = "Vishwavidyalaya Karya Soudha, Mysore",
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };
        context.Companies.Add(company);
        await context.SaveChangesAsync();

        if (!context.AcademicYears.Any())
        {
            var academicYear = new AcademicYear
            {
                Name = "2025-2026",
                StartDate = new DateTime(2025, 1, 1),
                EndDate = new DateTime(2025, 12, 31),
                IsCurrent = true,
                IsActive = true,
                CompanyId = company.Id,
                CreatedAt = DateTime.UtcNow
            };
            context.AcademicYears.Add(academicYear);
            await context.SaveChangesAsync();
        }
    }

    if (!context.ToDos.Any())
    {
        // No specific to-dos requested, but keeping it empty as per image for now
    }

    // SEED: Classes
    if (!context.Classes.Any())
    {
        var company = context.Companies.FirstOrDefault();
        var year = context.AcademicYears.FirstOrDefault(y => y.IsCurrent);

        if (company != null && year != null)
        {
            var classes = new List<Class>
            {
                new Class { Name = "Master of Commerce", CompanyId = company.Id, AcademicYearId = year.Id, IsActive = true, CreatedAt = DateTime.UtcNow },
                new Class { Name = "M.Com (Financial Management)", CompanyId = company.Id, AcademicYearId = year.Id, IsActive = true, CreatedAt = DateTime.UtcNow },
                new Class { Name = "M.Com (Accounting)", CompanyId = company.Id, AcademicYearId = year.Id, IsActive = true, CreatedAt = DateTime.UtcNow },
                new Class { Name = "M.Com (Marketing)", CompanyId = company.Id, AcademicYearId = year.Id, IsActive = true, CreatedAt = DateTime.UtcNow },
                new Class { Name = "M.Com (HRM)", CompanyId = company.Id, AcademicYearId = year.Id, IsActive = true, CreatedAt = DateTime.UtcNow }
            };
            context.Classes.AddRange(classes);
            await context.SaveChangesAsync();
        }
    }

    // SEED: Sections
    if (!context.Sections.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var sections = new List<Section>
            {
                new Section { Name = "Section A", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Section { Name = "Section B", IsActive = true, CreatedAt = DateTime.UtcNow },
                new Section { Name = "Section C", IsActive = true, CreatedAt = DateTime.UtcNow }
            };
            context.Sections.AddRange(sections);
            await context.SaveChangesAsync();
        }
    }

    // AUTO-FIX: Ensure ClassSections exist for testing
    if (!context.ClassSections.Any() && context.Classes.Any() && context.Sections.Any())
    {
        var classes = context.Classes.ToList();
        var sections = context.Sections.ToList();

        foreach (var cls in classes)
        {
            foreach (var sec in sections)
            {
                context.ClassSections.Add(new ClassSection
                {
                    ClassId = cls.Id,
                    SectionId = sec.Id
                });
            }
        }
        await context.SaveChangesAsync();
    }
    // SEED: Admin Setup Items (Sources, References, etc.)
    if (!context.AdminSetupItems.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var setupItems = new List<AdminSetupItem>
            {
                // Sources
                new AdminSetupItem { Category = "Source", Name = "Advertisement", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Source", Name = "Website", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Source", Name = "Direct Visit", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Source", Name = "Referral", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Source", Name = "Social Media", CompanyId = company.Id, Description = "" },
                
                // References
                new AdminSetupItem { Category = "Reference", Name = "Newspaper", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Reference", Name = "Facebook", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Reference", Name = "Google", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Reference", Name = "Friend/Relative", CompanyId = company.Id, Description = "" },
                
                // Purposes
                new AdminSetupItem { Category = "Purpose", Name = "Admission Inquiry", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Purpose", Name = "Fees Payment", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "Purpose", Name = "Meeting", CompanyId = company.Id, Description = "" },
                
                // Complaint Types
                new AdminSetupItem { Category = "ComplaintType", Name = "Academic", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "ComplaintType", Name = "Transport", CompanyId = company.Id, Description = "" },
                new AdminSetupItem { Category = "ComplaintType", Name = "Infrastructure", CompanyId = company.Id, Description = "" }
            };
            context.AdminSetupItems.AddRange(setupItems);
            await context.SaveChangesAsync();
        }
    }

    // SEED: Chart of Account (Simple)
    if (!context.ChartOfAccounts.Any())
    {
        var coas = new List<ChartOfAccount>
        {
            new ChartOfAccount { Head = "Admission Fee", Type = "Income", IsActive = true },
            new ChartOfAccount { Head = "Tuition Fee", Type = "Income", IsActive = true },
            new ChartOfAccount { Head = "Transport Fee", Type = "Income", IsActive = true },
            new ChartOfAccount { Head = "Other Income", Type = "Income", IsActive = true },
            new ChartOfAccount { Head = "Electricity Bill", Type = "Expense", IsActive = true },
            new ChartOfAccount { Head = "Staff Salary", Type = "Expense", IsActive = true },
            new ChartOfAccount { Head = "Furniture", Type = "Expense", IsActive = true },
            new ChartOfAccount { Head = "Printing & Stationery", Type = "Expense", IsActive = true }
        };
        context.ChartOfAccounts.AddRange(coas);
        await context.SaveChangesAsync();
    }

    // SEED: Account Master (Standard Accounting Structure)
    if (!context.AccountGroups.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            // --- Level 1: Primary Roots ---
            var assets = new AccountGroup { Name = "Assets", Nature = AccountNature.Assets, IsPrimary = true, CompanyId = company.Id };
            var liabilities = new AccountGroup { Name = "Liabilities", Nature = AccountNature.Liabilities, IsPrimary = true, CompanyId = company.Id };
            var incomeRoot = new AccountGroup { Name = "Income", Nature = AccountNature.Income, IsPrimary = true, CompanyId = company.Id };
            var expenseRoot = new AccountGroup { Name = "Expenses", Nature = AccountNature.Expenses, IsPrimary = true, CompanyId = company.Id };

            context.AccountGroups.AddRange(assets, liabilities, incomeRoot, expenseRoot);
            await context.SaveChangesAsync();

            // --- Level 2: Sub Groups ---

            // Assets Subgroups
            var currentAssets = new AccountGroup { Name = "Current Assets", ParentGroupId = assets.Id, Nature = AccountNature.Assets, CompanyId = company.Id };
            var fixedAssets = new AccountGroup { Name = "Fixed Assets", ParentGroupId = assets.Id, Nature = AccountNature.Assets, CompanyId = company.Id };
            var investments = new AccountGroup { Name = "Investments", ParentGroupId = assets.Id, Nature = AccountNature.Assets, CompanyId = company.Id };

            // Liabilities Subgroups
            var capitalAccount = new AccountGroup { Name = "Capital Account", ParentGroupId = liabilities.Id, Nature = AccountNature.Liabilities, CompanyId = company.Id };
            var currentLiabilities = new AccountGroup { Name = "Current Liabilities", ParentGroupId = liabilities.Id, Nature = AccountNature.Liabilities, CompanyId = company.Id };
            var loans = new AccountGroup { Name = "Loans (Liability)", ParentGroupId = liabilities.Id, Nature = AccountNature.Liabilities, CompanyId = company.Id };

            // Income Subgroups
            var directIncome = new AccountGroup { Name = "Direct Income", ParentGroupId = incomeRoot.Id, Nature = AccountNature.Income, CompanyId = company.Id };
            var indirectIncome = new AccountGroup { Name = "Indirect Income", ParentGroupId = incomeRoot.Id, Nature = AccountNature.Income, CompanyId = company.Id };

            // Expense Subgroups
            var directExpenses = new AccountGroup { Name = "Direct Expenses", ParentGroupId = expenseRoot.Id, Nature = AccountNature.Expenses, CompanyId = company.Id };
            var indirectExpenses = new AccountGroup { Name = "Indirect Expenses", ParentGroupId = expenseRoot.Id, Nature = AccountNature.Expenses, CompanyId = company.Id };

            context.AccountGroups.AddRange(currentAssets, fixedAssets, investments, capitalAccount, currentLiabilities, loans, directIncome, indirectIncome, directExpenses, indirectExpenses);
            await context.SaveChangesAsync();

            // --- Level 3: Detailed Sub Groups ---

            // Under Current Assets
            var cashInHand = new AccountGroup { Name = "Cash-in-Hand", ParentGroupId = currentAssets.Id, Nature = AccountNature.Assets, CompanyId = company.Id };
            var bankAccounts = new AccountGroup { Name = "Bank Accounts", ParentGroupId = currentAssets.Id, Nature = AccountNature.Assets, CompanyId = company.Id };
            var sundryDebtors = new AccountGroup { Name = "Sundry Debtors (Receivables)", ParentGroupId = currentAssets.Id, Nature = AccountNature.Assets, CompanyId = company.Id };

            // Under Current Liabilities
            var sundryCreditors = new AccountGroup { Name = "Sundry Creditors (Payables)", ParentGroupId = currentLiabilities.Id, Nature = AccountNature.Liabilities, CompanyId = company.Id };
            var dutiesTaxes = new AccountGroup { Name = "Duties & Taxes", ParentGroupId = currentLiabilities.Id, Nature = AccountNature.Liabilities, CompanyId = company.Id };
            var provisions = new AccountGroup { Name = "Provisions", ParentGroupId = currentLiabilities.Id, Nature = AccountNature.Liabilities, CompanyId = company.Id };

            context.AccountGroups.AddRange(cashInHand, bankAccounts, sundryDebtors, sundryCreditors, dutiesTaxes, provisions);
            await context.SaveChangesAsync();

            // --- Default Ledgers (Comprehensive List) ---
            var ledgers = new List<Ledger>();

            // 1. Cash & Bank
            ledgers.Add(new Ledger { Name = "Cash Account", AccountGroupId = cashInHand.Id, CompanyId = company.Id, IsSystem = true, OpeningBalance = 0, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Petty Cash", AccountGroupId = cashInHand.Id, CompanyId = company.Id, OpeningBalance = 0, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Main Bank Account", AccountGroupId = bankAccounts.Id, CompanyId = company.Id, OpeningBalance = 0, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "School Fund Account", AccountGroupId = bankAccounts.Id, CompanyId = company.Id, OpeningBalance = 0, IsDebitOpening = true });

            // 2. Income Ledgers (Fees - Direct Income)
            ledgers.Add(new Ledger { Name = "Admission Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Tuition Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Registration / Prospectus Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Exam Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Transport Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Library Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Hostel Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Lab Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Sports Fees", AccountGroupId = directIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Annual Charges", AccountGroupId = directIncome.Id, CompanyId = company.Id });

            // 3. Indirect Income (Misc)
            ledgers.Add(new Ledger { Name = "Bank Interest", AccountGroupId = indirectIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Sale of Forms", AccountGroupId = indirectIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Fine / Late Fee", AccountGroupId = indirectIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Misc Income", AccountGroupId = indirectIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Alumni Donation", AccountGroupId = indirectIncome.Id, CompanyId = company.Id });
            ledgers.Add(new Ledger { Name = "Start-up Grant", AccountGroupId = indirectIncome.Id, CompanyId = company.Id });

            // 4. Expenses (Indirect - Admin/Ops)
            // Staff
            ledgers.Add(new Ledger { Name = "Teaching Staff Salary", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Non-Teaching Staff Salary", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Visiting Faculty Honorarium", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Security Service Charges", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Housekeeping Charges", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });

            // Utilities
            ledgers.Add(new Ledger { Name = "Electricity Charges", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Water Charges", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Telephone & Internet", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });

            // Admin
            ledgers.Add(new Ledger { Name = "Printing & Stationery", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Postage & Courier", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Office Maintenance", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Marketing & Advertisement", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Newspaper & Periodicals", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Software Subscription", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Website Maintenance", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });

            // Repairs
            ledgers.Add(new Ledger { Name = "Repairs & Maint. (Building)", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Repairs & Maint. (Furniture)", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Repairs & Maint. (Vehicles)", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Vehicle Fuel (Diesel/Petrol)", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });

            // Professional
            ledgers.Add(new Ledger { Name = "Audit Fees", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Legal Charges", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Bank Charges", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Depreciation", AccountGroupId = indirectExpenses.Id, CompanyId = company.Id, IsDebitOpening = true });

            // 5. Assets
            ledgers.Add(new Ledger { Name = "School Building", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Land", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Computers & Peripherals", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Printers & Scanners", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Smart Boards / Projectors", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Furniture & Fixtures", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "School Vehicles (Bus/Van)", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Library Books (Asset)", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Lab Equipment", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });
            ledgers.Add(new Ledger { Name = "Sports Equipment", AccountGroupId = fixedAssets.Id, CompanyId = company.Id, IsDebitOpening = true });

            // 6. Liabilities
            ledgers.Add(new Ledger { Name = "Corpus Fund / Capital", AccountGroupId = capitalAccount.Id, CompanyId = company.Id, IsDebitOpening = false });
            ledgers.Add(new Ledger { Name = "Caution Money (Refundable)", AccountGroupId = currentLiabilities.Id, CompanyId = company.Id, IsDebitOpening = false });
            ledgers.Add(new Ledger { Name = "TDS Payable", AccountGroupId = dutiesTaxes.Id, CompanyId = company.Id, IsDebitOpening = false });
            ledgers.Add(new Ledger { Name = "GST Payable", AccountGroupId = dutiesTaxes.Id, CompanyId = company.Id, IsDebitOpening = false });
            ledgers.Add(new Ledger { Name = "Salary Payable", AccountGroupId = provisions.Id, CompanyId = company.Id, IsDebitOpening = false });

            context.Ledgers.AddRange(ledgers);
            await context.SaveChangesAsync();
        }
    }

    // SEED: Subjects for each class
    if (!context.Subjects.Any())
    {
        var classes = context.Classes.ToList();
        var subjectDefs = new[] {
            ("English",           "ENG", "Theory"),
            ("Mathematics",       "MTH", "Theory"),
            ("Science",           "SCI", "Theory"),
            ("Social Studies",    "SST", "Theory"),
            ("Computer Science",  "CS",  "Theory"),
            ("Hindi",             "HIN", "Theory"),
            ("Physical Education","PE",  "Practical")
        };
        var subjects = new List<Subject>();
        foreach (var cls in classes)
        {
            foreach (var (name, code, type) in subjectDefs)
            {
                subjects.Add(new Subject
                {
                    Name = name,
                    Code = code + cls.Id,
                    ClassId = cls.Id,
                    Type = type,
                    IsActive = true
                });
            }
        }
        context.Subjects.AddRange(subjects);
        await context.SaveChangesAsync();
    }

    // SEED: Fees Groups & Types
    if (!context.FeesGroups.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var feesGroups = new List<FeesGroup>
            {
                new FeesGroup { Name = "Monthly Fees",   Description = "Monthly recurring fees",      IsActive = true, CompanyId = company.Id },
                new FeesGroup { Name = "Annual Fees",    Description = "One-time yearly fees",         IsActive = true, CompanyId = company.Id },
                new FeesGroup { Name = "Transport Fees", Description = "School bus/transport fees",    IsActive = true, CompanyId = company.Id },
                new FeesGroup { Name = "Exam Fees",      Description = "Examination fees",             IsActive = true, CompanyId = company.Id }
            };
            context.FeesGroups.AddRange(feesGroups);
            await context.SaveChangesAsync();

            if (!context.FeesTypes.Any())
            {
                var monthly = feesGroups[0];
                var annual = feesGroups[1];
                var transport = feesGroups[2];
                var exam = feesGroups[3];
                var feesTypes = new List<FeesType>
                {
                    new FeesType { FeesCode = "TF001", Name = "Tuition Fee",          Amount = 2000, FeesGroupId = monthly.Id,   IsActive = true },
                    new FeesType { FeesCode = "TF002", Name = "Computer Lab Fee",     Amount = 500,  FeesGroupId = monthly.Id,   IsActive = true },
                    new FeesType { FeesCode = "TF003", Name = "Library Fee",          Amount = 200,  FeesGroupId = monthly.Id,   IsActive = true },
                    new FeesType { FeesCode = "AF001", Name = "Admission Fee",        Amount = 5000, FeesGroupId = annual.Id,    IsActive = true },
                    new FeesType { FeesCode = "AF002", Name = "Annual Function Fee",  Amount = 1000, FeesGroupId = annual.Id,    IsActive = true },
                    new FeesType { FeesCode = "AF003", Name = "Sports Fee",           Amount = 800,  FeesGroupId = annual.Id,    IsActive = true },
                    new FeesType { FeesCode = "TR001", Name = "Bus Fee (Near Zone)",  Amount = 1500, FeesGroupId = transport.Id, IsActive = true },
                    new FeesType { FeesCode = "TR002", Name = "Bus Fee (Far Zone)",   Amount = 2500, FeesGroupId = transport.Id, IsActive = true },
                    new FeesType { FeesCode = "EX001", Name = "Half Yearly Exam Fee", Amount = 500,  FeesGroupId = exam.Id,      IsActive = true },
                    new FeesType { FeesCode = "EX002", Name = "Annual Exam Fee",      Amount = 1000, FeesGroupId = exam.Id,      IsActive = true },
                };
                context.FeesTypes.AddRange(feesTypes);
                await context.SaveChangesAsync();
            }
        }
    }

    // SEED: HR - Departments
    if (!context.Departments.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var departments = new List<Department>
            {
                new Department { Name = "Administration",      CompanyId = company.Id, IsActive = true },
                new Department { Name = "Teaching",            CompanyId = company.Id, IsActive = true },
                new Department { Name = "Accounts & Finance",  CompanyId = company.Id, IsActive = true },
                new Department { Name = "Transport",           CompanyId = company.Id, IsActive = true },
                new Department { Name = "Library",             CompanyId = company.Id, IsActive = true },
                new Department { Name = "Security",            CompanyId = company.Id, IsActive = true }
            };
            context.Departments.AddRange(departments);
            await context.SaveChangesAsync();
        }
    }

    // SEED: HR - Designations
    if (!context.Designations.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var designations = new List<Designation>
            {
                new Designation { Title = "Principal",         CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Vice Principal",    CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Senior Teacher",    CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Teacher",           CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Assistant Teacher", CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Accountant",        CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Librarian",         CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Receptionist",      CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Bus Driver",        CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Security Guard",    CompanyId = company.Id, IsActive = true },
                new Designation { Title = "Peon / Helper",     CompanyId = company.Id, IsActive = true }
            };
            context.Designations.AddRange(designations);
            await context.SaveChangesAsync();
        }
    }

    // SEED: Leave Types
    if (!context.LeaveTypes.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var leaveTypes = new List<LeaveType>
            {
                new LeaveType { Name = "Casual Leave",   CompanyId = company.Id, IsActive = true },
                new LeaveType { Name = "Sick Leave",     CompanyId = company.Id, IsActive = true },
                new LeaveType { Name = "Earned Leave",   CompanyId = company.Id, IsActive = true },
                new LeaveType { Name = "Maternity Leave",CompanyId = company.Id, IsActive = true },
                new LeaveType { Name = "Study Leave",    CompanyId = company.Id, IsActive = true },
                new LeaveType { Name = "Half Day Leave", CompanyId = company.Id, IsActive = true }
            };
            context.LeaveTypes.AddRange(leaveTypes);
            await context.SaveChangesAsync();
        }
    }

    // SEED: Exam Types
    if (!context.ExamTypes.Any())
    {
        var examTypes = new List<ExamType>
        {
            new ExamType { Name = "Unit Test 1" },
            new ExamType { Name = "Unit Test 2" },
            new ExamType { Name = "Half Yearly Exam" },
            new ExamType { Name = "Pre-Board Exam" },
            new ExamType { Name = "Annual Exam" },
            new ExamType { Name = "Online Quiz" }
        };
        context.ExamTypes.AddRange(examTypes);
        await context.SaveChangesAsync();
    }

    // SEED: Mark Grades
    if (!context.MarkGrades.Any())
    {
        var grades = new List<MarkGrade>
        {
            new MarkGrade { Name = "A+", MinPercentage = 90, MaxPercentage = 100, Gpa = 10.0m, Description = "Outstanding" },
            new MarkGrade { Name = "A",  MinPercentage = 80, MaxPercentage = 89,  Gpa = 9.0m,  Description = "Excellent" },
            new MarkGrade { Name = "B+", MinPercentage = 70, MaxPercentage = 79,  Gpa = 8.0m,  Description = "Very Good" },
            new MarkGrade { Name = "B",  MinPercentage = 60, MaxPercentage = 69,  Gpa = 7.0m,  Description = "Good" },
            new MarkGrade { Name = "C",  MinPercentage = 50, MaxPercentage = 59,  Gpa = 6.0m,  Description = "Average" },
            new MarkGrade { Name = "D",  MinPercentage = 40, MaxPercentage = 49,  Gpa = 5.0m,  Description = "Below Average" },
            new MarkGrade { Name = "F",  MinPercentage = 0,  MaxPercentage = 39,  Gpa = 0.0m,  Description = "Fail" }
        };
        context.MarkGrades.AddRange(grades);
        await context.SaveChangesAsync();
    }

    // SEED: Library Book Categories
    if (!context.BookCategories.Any())
    {
        var categories = new List<BookCategory>
        {
            new BookCategory { Name = "Textbooks" },
            new BookCategory { Name = "Reference Books" },
            new BookCategory { Name = "Science & Technology" },
            new BookCategory { Name = "Literature & Fiction" },
            new BookCategory { Name = "History & Geography" },
            new BookCategory { Name = "Biographies" },
            new BookCategory { Name = "Magazines & Periodicals" },
            new BookCategory { Name = "Children's Books" }
        };
        context.BookCategories.AddRange(categories);
        await context.SaveChangesAsync();
    }

    // SEED: Inventory - Item Categories
    if (!context.ItemCategories.Any())
    {
        var cats = new List<ItemCategory>
        {
            new ItemCategory { Name = "Stationery" },
            new ItemCategory { Name = "Sports Equipment" },
            new ItemCategory { Name = "Lab Equipment" },
            new ItemCategory { Name = "Furniture" },
            new ItemCategory { Name = "Electronics" },
            new ItemCategory { Name = "Cleaning Supplies" }
        };
        context.ItemCategories.AddRange(cats);
        await context.SaveChangesAsync();
    }

    // SEED: Inventory - Item Stores
    if (!context.ItemStores.Any())
    {
        var stores = new List<ItemStore>
        {
            new ItemStore { StoreName = "Main Store",   StoreNumber = "S-01" },
            new ItemStore { StoreName = "Sports Store", StoreNumber = "S-02" },
            new ItemStore { StoreName = "Lab Store",    StoreNumber = "S-03" }
        };
        context.ItemStores.AddRange(stores);
        await context.SaveChangesAsync();
    }

    // SEED: Student Categories
    if (!context.StudentCategories.Any())
    {
        var studentCats = new List<StudentCategory>
        {
            new StudentCategory { Name = "General" },
            new StudentCategory { Name = "OBC" },
            new StudentCategory { Name = "SC/ST" },
            new StudentCategory { Name = "EWS" },
            new StudentCategory { Name = "Minority" },
            new StudentCategory { Name = "Differently Abled" }
        };
        context.StudentCategories.AddRange(studentCats);
        await context.SaveChangesAsync();
    }

    // SEED: Behaviour Incidents
    if (!context.Incidents.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var incidents = new List<Incident>
            {
                new Incident { Title = "Late to Class",                   Description = "Student arrived late without valid reason",    CompanyId = company.Id },
                new Incident { Title = "Misbehaviour",                    Description = "Misbehaviour with teacher or peers",           CompanyId = company.Id },
                new Incident { Title = "Bullying",                        Description = "Physical or verbal bullying",                  CompanyId = company.Id },
                new Incident { Title = "Cheating in Exam",                Description = "Caught cheating during examination",           CompanyId = company.Id },
                new Incident { Title = "Damage to Property",              Description = "Damaging school property intentionally",       CompanyId = company.Id },
                new Incident { Title = "Positive: Outstanding Performance",Description = "Exceptional academic or sports performance",  CompanyId = company.Id },
                new Incident { Title = "Positive: Helping Fellow Student", Description = "Showed exceptional kindness or helpfulness",  CompanyId = company.Id }
            };
            context.Incidents.AddRange(incidents);
            await context.SaveChangesAsync();
        }
    }

    // SEED: Transport Routes
    if (!context.Routes.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var routes = new List<EasyEdu.Models.Route>
            {
                new EasyEdu.Models.Route { Name = "Route 1 - North Zone",  RouteFee = 1500, CompanyId = company.Id, IsActive = true },
                new EasyEdu.Models.Route { Name = "Route 2 - South Zone",  RouteFee = 1500, CompanyId = company.Id, IsActive = true },
                new EasyEdu.Models.Route { Name = "Route 3 - East Zone",   RouteFee = 2000, CompanyId = company.Id, IsActive = true },
                new EasyEdu.Models.Route { Name = "Route 4 - West Zone",   RouteFee = 2000, CompanyId = company.Id, IsActive = true },
                new EasyEdu.Models.Route { Name = "Route 5 - City Centre", RouteFee = 1000, CompanyId = company.Id, IsActive = true }
            };
            context.Routes.AddRange(routes);
            await context.SaveChangesAsync();
        }
    }

    // SEED: Class Rooms
    if (!context.ClassRooms.Any())
    {
        var classrooms = new List<ClassRoom>
        {
            new ClassRoom { RoomNo = "101",   Capacity = 40,  IsActive = true },
            new ClassRoom { RoomNo = "102",   Capacity = 40,  IsActive = true },
            new ClassRoom { RoomNo = "103",   Capacity = 40,  IsActive = true },
            new ClassRoom { RoomNo = "104",   Capacity = 40,  IsActive = true },
            new ClassRoom { RoomNo = "105",   Capacity = 40,  IsActive = true },
            new ClassRoom { RoomNo = "Lab-1", Capacity = 30,  IsActive = true },
            new ClassRoom { RoomNo = "Lab-2", Capacity = 30,  IsActive = true },
            new ClassRoom { RoomNo = "Lib",   Capacity = 50,  IsActive = true },
            new ClassRoom { RoomNo = "Hall",  Capacity = 200, IsActive = true }
        };
        context.ClassRooms.AddRange(classrooms);
        await context.SaveChangesAsync();
    }

    // SEED: Dormitories & Rooms
    if (!context.Dormitories.Any())
    {
        var dorms = new List<Dormitory>
        {
            new Dormitory { Name = "Boys Hostel Block A",  Type = "Boys",  Capacity = 60, Address = "School Campus, North Wing" },
            new Dormitory { Name = "Boys Hostel Block B",  Type = "Boys",  Capacity = 40, Address = "School Campus, East Wing" },
            new Dormitory { Name = "Girls Hostel Block A", Type = "Girls", Capacity = 60, Address = "School Campus, South Wing" }
        };
        context.Dormitories.AddRange(dorms);
        await context.SaveChangesAsync();

        var dormRooms = new List<DormitoryRoom>();
        foreach (var dorm in dorms)
        {
            for (int r = 1; r <= 5; r++)
            {
                dormRooms.Add(new DormitoryRoom
                {
                    RoomNumber = $"{dorm.Name.Substring(0, 1)}-{r:D2}",
                    RoomType = "Non-AC",
                    NumberOfBeds = 4,
                    CostPerBed = 3000m,
                    DormitoryId = dorm.Id,
                    Description = "Standard " + dorm.Type + " hostel room"
                });
            }
        }
        context.DormitoryRooms.AddRange(dormRooms);
        await context.SaveChangesAsync();
    }

    // SEED: Student Groups
    if (!context.StudentGroups.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            var groups = new List<StudentGroup>
            {
                new StudentGroup { Name = "Science Group",     CompanyId = company.Id, IsActive = true },
                new StudentGroup { Name = "Commerce Group",    CompanyId = company.Id, IsActive = true },
                new StudentGroup { Name = "Arts Group",        CompanyId = company.Id, IsActive = true },
                new StudentGroup { Name = "Sports Excellence", CompanyId = company.Id, IsActive = true }
            };
            context.StudentGroups.AddRange(groups);
            await context.SaveChangesAsync();
        }
    }
    // SEED: Student Settings
    if (!context.StudentSettings.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            context.StudentSettings.Add(new StudentSettings
            {
                CompanyId = company.Id,
                RegistrationNumberAutoGenerate = true,
                RegistrationNumberPrefix = "ADM-",
                AdmissionDateMandatory = true,
                ShowSiblingInfo = true,
                MultipleClassStudent = false
            });
            await context.SaveChangesAsync();
        }
    }

    // SEED: Staff Settings
    if (!context.StaffSettings.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            context.StaffSettings.Add(new StaffSettings
            {
                CompanyId = company.Id,
                AutoEmployeeNumber = true,
                EmployeeNumberPrefix = "STF-",
                EnableBiometricAttendance = false,
                PayrollCycle = "Monthly"
            });
            await context.SaveChangesAsync();
        }
    }

    // SEED: Exam Settings
    if (!context.ExamSettings.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            context.ExamSettings.Add(new ExamSettings
            {
                CompanyId = company.Id,
                AverageCalculationMethod = "Simple",
                ShowGrade = true,
                ShowGpa = true,
                ShowRemarks = true
            });
            await context.SaveChangesAsync();
        }
    }

    // SEED: Behaviour Settings
    if (!context.BehaviourSettings.Any())
    {
        var company = context.Companies.FirstOrDefault();
        if (company != null)
        {
            context.BehaviourSettings.Add(new BehaviourSettings
            {
                CompanyId = company.Id,
                EnablePointSystem = true,
                DefaultPassingPoint = 50,
                ShowPointInReportCard = true
            });
            await context.SaveChangesAsync();
        }
    }

    // SEED: Suppliers
    if (!context.Suppliers.Any())
    {
        var suppliers = new List<Supplier>
        {
            new Supplier { Name = "Global Book Distributors", ContactPerson = "James Wilson", Phone = "0123456789", Address = "London, UK" },
            new Supplier { Name = "Tech Solutions Ltd",      ContactPerson = "Emily Davis",  Phone = "0987654321", Address = "Mumbai, India" },
            new Supplier { Name = "Apex Sports Goods",        ContactPerson = "Robert Brown", Phone = "1122334455", Address = "Sydney, Australia" }
        };
        context.Suppliers.AddRange(suppliers);
        await context.SaveChangesAsync();
    }

    // SEED: Bank Accounts
    if (!context.BankAccounts.Any())
    {
        var banks = new List<BankAccount>
        {
            new BankAccount { BankName = "Chase Bank",         AccountName = "School Main Account",    AccountNumber = "1001223344", OpeningBalance = 500000, CurrentBalance = 500000 },
            new BankAccount { BankName = "HSBC",               AccountName = "Staff Salary Account",  AccountNumber = "2005667788", OpeningBalance = 1000000, CurrentBalance = 1000000 },
            new BankAccount { BankName = "State Bank Of India",AccountName = "Fees Collection Account",AccountNumber = "400998877", OpeningBalance = 0,         CurrentBalance = 0 }
        };
        context.BankAccounts.AddRange(banks);
        await context.SaveChangesAsync();
    }

    // SEED: Home Slider
    if (!context.HomeSliders.Any())
    {
        var sliders = new List<HomeSlider>
        {
            new HomeSlider { Title = "Welcome to Our School",  Description = "Shaping young minds for a brighter future.", ImagePath = "/images/slider1.jpg" },
            new HomeSlider { Title = "Modern Lab Facilities", Description = "Practical learning with state-of-the-art labs.", ImagePath = "/images/slider2.jpg" },
            new HomeSlider { Title = "Excellence in Sports",   Description = "Encouraging a healthy lifestyle and teamwork.", ImagePath = "/images/slider3.jpg" }
        };
        context.HomeSliders.AddRange(sliders);
        await context.SaveChangesAsync();
    }

    // SEED: Social Media Links
    if (!context.SocialMedias.Any())
    {
        var social = new List<SocialMedia>
        {
            new SocialMedia { PlatformName = "Facebook",  Url = "https://facebook.com/ourschool", IconClass = "fab fa-facebook" },
            new SocialMedia { PlatformName = "Twitter",   Url = "https://twitter.com/ourschool",  IconClass = "fab fa-twitter" },
            new SocialMedia { PlatformName = "LinkedIn",  Url = "https://linkedin.com/ourschool", IconClass = "fab fa-linkedin" },
            new SocialMedia { PlatformName = "Instagram", Url = "https://instagram.com/ourschool",IconClass = "fab fa-instagram" }
        };
        context.SocialMedias.AddRange(social);
        await context.SaveChangesAsync();
    }

    // SEED: About Us
    if (!context.AboutUsEntries.Any())
    {
        context.AboutUsEntries.Add(new AboutUs
        {
            Title = "Our Legacy of Education",
            Content = "Our school was founded in 1995 with the vision of providing holistic education to all. Over the years, we have produced thousands of successful leaders, scientists, and artists. We believe in learning by doing."
        });
        await context.SaveChangesAsync();
    }
}

// Seed default roles and admin user
async Task SeedRolesAndAdmin(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
{
    string[] roles = { "SuperAdmin", "Admin", "Teacher", "Student", "Parent", "Accountant", "Librarian", "Receptionist", "TransportManager", "StoreManager" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    // List of test users to create
    var testUsers = new List<(string Email, string Role, string Password, string FullName)>
    {
        ("admin@easyedu.com", "SuperAdmin", "Admin@123", "System Administrator"),
        ("student@easyedu.com", "Student", "Student@123", "SHARIEF. M. A"),
        ("parent@easyedu.com", "Parent", "Parent@123", "Test Parent"),
        ("teacher@easyedu.com", "Teacher", "Teacher@123", "Test Teacher"),
        ("admin_staff@easyedu.com", "Admin", "Admin@123", "Admin Staff"),
        ("accountant@easyedu.com", "Accountant", "Accountant@123", "Test Accountant"),
        ("receptionist@easyedu.com", "Receptionist", "Receptionist@123", "Test Receptionist"),
        ("librarian@easyedu.com", "Librarian", "Librarian@123", "Test Librarian")
    };

    foreach (var userDef in testUsers)
    {
        var user = await userManager.FindByEmailAsync(userDef.Email);
        if (user == null)
        {
            var newUser = new ApplicationUser
            {
                UserName = userDef.Email,
                Email = userDef.Email,
                EmailConfirmed = true,
                FullName = userDef.FullName,
                IsActive = true,
                CompanyId = 1
            };

            var result = await userManager.CreateAsync(newUser, userDef.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(newUser, userDef.Role);

                // Create Student record for the student user if not exists
                if (userDef.Role == "Student" && userDef.Email == "student@easyedu.com")
                {
                    using var scope = app.Services.CreateScope();
                    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                    if (!context.Students.Any(s => s.UserId == newUser.Id))
                    {
                        var mcomClass = context.Classes.FirstOrDefault(c => c.Name == "Master of Commerce");
                        var company = context.Companies.FirstOrDefault();
                        var section = context.Sections.FirstOrDefault();

                        if (mcomClass != null && company != null && section != null)
                        {
                            context.Students.Add(new Student
                            {
                                UserId = newUser.Id,
                                FirstName = "SHARIEF.",
                                LastName = "M. A",
                                AdmissionNumber = "MCO24022",
                                RollNumber = 101,
                                ClassId = mcomClass.Id,
                                SectionId = section.Id,
                                CompanyId = company.Id,
                                AdmissionDate = DateTime.UtcNow,
                                DateOfBirth = new DateTime(2000, 1, 1),
                                Gender = "Male",
                                IsActive = true
                            });
                            await context.SaveChangesAsync();
                        }
                    }
                }
            }
        }
    }
}
