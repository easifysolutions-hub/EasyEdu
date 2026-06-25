using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;

namespace EasyEdu.Controllers;

/// <summary>
/// Controller to handle language/culture switching for multilingual support.
/// Sets a cookie-based culture so subsequent requests use the chosen language.
/// </summary>
public class LanguageController : Controller
{
    /// <summary>
    /// Sets the application culture via a cookie and redirects back to the calling page.
    /// </summary>
    /// <param name="culture">The culture code to switch to (e.g., "en", "hi", "kn", "ta", "te")</param>
    /// <param name="returnUrl">The URL to redirect back to after setting the culture</param>
    public IActionResult Set(string culture, string returnUrl = "/")
    {
        // Validate that the culture is one of our supported languages
        var supportedCultures = new[] { "en", "hi", "kn", "ta", "te" };
        if (!supportedCultures.Contains(culture))
        {
            culture = "en"; // Default to English if an invalid culture is requested
        }

        // Set the culture cookie that ASP.NET Core will read on subsequent requests
        Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
            new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddYears(1),
                IsEssential = true,
                SameSite = SameSiteMode.Lax
            }
        );

        // Redirect back to the page the user was on (safely validated to prevent open redirects)
        if (Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        return RedirectToAction("Index", "Dashboard");
    }
}
