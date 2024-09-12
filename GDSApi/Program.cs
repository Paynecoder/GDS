// Author: Joshua Payne
using GDSApi.Models;

var builder = WebApplication.CreateBuilder(args);


// Configure CORS to allow requests from angular frontend.
builder.Services.AddControllers();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAngularApp");
app.UseAuthorization();

// In-memory storage for results.
var results = new List<ResultEntry>();
var nextKey = 10000;

// POST method to store a result entry.
// Endpoint: /api/results
// Accepts a ResultEntry object, assigns a unique key then adds it to the list.
app.MapPost("/api/results", (ResultEntry entry) => {
    if (entry == null || entry.Result == null)
    {
        return Results.BadRequest("parameter 'result' is missing :(");
    }

    var key = nextKey++;
    entry.Key = key;
    results.Add(entry);
    return Results.Ok(entry); // Return the key to their info.
});

// GET method to retrieve a result by its key.
// Endpoint: /api/results/{key}
// Searches for a result entry in the list by key and returns it if found.
app.MapGet("/api/results/{key:int}", (int key) => {
    var resultEntry = results.FirstOrDefault(r => r.Key == key);
    if (resultEntry == null)
    {
        return Results.NotFound("result not found :( ");
    }
    return Results.Ok(resultEntry);
});

app.Run();

