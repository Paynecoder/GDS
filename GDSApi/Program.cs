// Author: Joshua Payne
using GDSApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// CORS
builder.Services.AddControllers();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// SQLite
builder.Services.AddDbContext<GDSContext>(options =>
    options.UseSqlite("Data Source=gds.db"));

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAngularApp");
app.UseAuthorization();

// POST method to store a result entry.
// Endpoint: /api/results
// Accepts a ResultEntry object, assigns a unique identifier, and adds it to the database.
app.MapPost("/api/results", async (ResultEntry entry, GDSContext dbContext) => {
    if (entry.Result == null)
    {
        return Results.BadRequest("parameter 'result' is missing :(");
    }

    dbContext.Results.Add(entry);
    await dbContext.SaveChangesAsync();
    return Results.Ok(entry); // Return the saved entry with its unique key.
});

// GET method to retrieve a result by its key.
// Endpoint: /api/results/{key}
// Searches for a result entry in the database using its key and returns it if found.
app.MapGet("/api/results/{key:int}", async (int key, GDSContext dbContext) => {
    var resultEntry = await dbContext.Results.FindAsync(key);
    if (resultEntry == null)
    {
        return Results.NotFound("result not found :( ");
    }
    return Results.Ok(resultEntry);
});

app.Run();

