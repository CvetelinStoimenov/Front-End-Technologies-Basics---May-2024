using Firestore_Demo.Models;
using Google.Cloud.Firestore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Diagnostics;
using System.Text.Json;
using static Google.Cloud.Firestore.V1.StructuredQuery.Types;

namespace Firestore_Demo.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly string projectId;
        private readonly FirestoreDb database;

        public HomeController(ILogger<HomeController> logger,
            IConfiguration configuration)
        {
            
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Note model)
        {
            
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
