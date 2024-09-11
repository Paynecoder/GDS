using GDSApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowAngularApp");
app.UseAuthorization();

var results = new List<ResultEntry>();
var nextKey = 10000;

//POST
app.MapPost("/api/results", (ResultEntry entry) => {
    if (entry == null || entry.Result == null)
    {
        return Results.BadRequest("Required parameter 'result' is missing.");
    }

    var key = nextKey++;
    entry.Key = key;
    results.Add(entry);
    return Results.Ok(entry);
});

//GET
app.MapGet("/api/results/{key:int}", (int key) => {
    var resultEntry = results.FirstOrDefault(r => r.Key == key);
    if (resultEntry == null)
    {
        return Results.NotFound("Result not found :( ");
    }
    return Results.Ok(resultEntry);
});

app.Run();

