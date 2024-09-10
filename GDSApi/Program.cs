using GDSApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy.WithOrigins("http://localhost:5257")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAngularClient");

var results = new List<ResultEntry>();
var nextKey = 10000;

// FAKE DATA
results.Add(new ResultEntry { Key = nextKey++, Score = 75 });
results.Add(new ResultEntry { Key = nextKey++, Score = 85 });
results.Add(new ResultEntry { Key = nextKey++, Score = 95 });

//POST
app.MapPost("/api/results", (int result) => {
    var key= nextKey++;
    var resultEntry = new ResultEntry { Key = key, Score = result };
    results.Add(resultEntry);
    return Results.Ok(resultEntry);
});

//GET
app.MapGet("/api/results/{key:int}", (int key) => {
    var resultEntry = results.FirstOrDefault(r => r.Key == key);
    if (resultEntry == null)
    {
        return Results.NotFound("Score not found :(");
    }
    return Results.Ok(resultEntry);
});

app.Run();

