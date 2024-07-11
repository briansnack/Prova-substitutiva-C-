using System.ComponentModel.DataAnnotations;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

//Configurar a política de CORS
builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();


app.MapGet("/", () => "Prova Substitutiva");

//ENDPOINTS DE ALUNO
//GET: http://localhost:5273/aluno/listar
app.MapGet("/aluno/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Alunos.Any())
    {
        return Results.Ok(ctx.Alunos.ToList());
    }
    return Results.NotFound("Nenhum aluno encontrado");
});

//POST: http://localhost:5273/aluno/cadastrar
app.MapPost("/aluno/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Aluno aluno) =>
{
    List<ValidationResult> erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(aluno, new ValidationContext(aluno), erros, true))
    {
        return Results.BadRequest(erros);
    }

    Aluno? alunoEncontrado = ctx.Alunos.FirstOrDefault(x => x.CPF == aluno.CPF);
    if (alunoEncontrado is null)
    {
        ctx.Alunos.Add(aluno);
        ctx.SaveChanges();
        return Results.Created("", aluno);
    }
    return Results.BadRequest("CPF já existente");
});


//ENDPOINTS DE IMC
//GET: http://localhost:5062/imc/listar
app.MapGet("/imc/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Imc.Any())
    {
        return Results.Ok(ctx.Imc.ToList());
    }
    return Results.NotFound("Nenhum imc encontrado");
});

//POST: http://localhost:5062/imc/cadastrar
app.MapPost("/imc/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Imc imc) =>
{
    //Calcular o IMC
    imc.Imcs = imc.Peso / (imc.Altura * imc.Altura);

    //Calcular o grau do IMC
    if (imc.Imcs < 18.5)
        return Results.Ok("Magreza, Grau de obesidade 0");
    if (imc.Imcs >= 18.5 && imc.Imcs <= 24.9)
        return Results.Ok("Normal, Grau de obesidade 0");
    if (imc.Imcs >= 25 && imc.Imcs <= 29.9)
        return Results.Ok("Sobrepeso, Grau de obesidade I");
    if (imc.Imcs >= 30 && imc.Imcs <= 39.9)
        return Results.Ok("Obesidade, Grau de obesidade II");
    else
        return Results.Ok("Obesidade Grave, Grau de obesidade III");

    ctx.Imc.Add(imc);
    ctx.SaveChanges();
    return Results.Created("", imc);
});

// PUT: http://localhost:5062/imc/alterar/{alunoId}
// app.MapPut("/imc/alterar/{alunoId}", ([FromServices] AppDataContext ctx, [FromRoute] string imcId) =>
// {
//     //Implementar a alteração do status da tarefa
//     Imc? imc = ctx.Imc.FirstOrDefault(x => x.imcId == imcId);
//     if (imc is null) {
//         return Results.NotFound("Imc não encontrado!");
//     }
//     imc.Altura = imcAlterado.Altura;
//     imc.Peso = ImcAlterado.Peso;
//     ctx.Imc.Update(imc);
//     ctx.SaveChanges();
//     return Results.Ok("Informações do Imc alteradas!");
// });

//GET: http://localhost:5062/imc/listar/{cpf}
app.MapGet("/imc/listar/{cpf}", ([FromServices] AppDataContext ctx, [FromRoute] string cpf) =>
{
    Imc? imc = ctx.Imc.
        Include(x => x.aluno).
        FirstOrDefault(f => f.aluno.CPF == cpf);
    if (imc is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(imc);
});

// //GET: http://localhost:5273/tarefas/concluidas
// app.MapGet("/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
// {
//Implementar a listagem de tarefas concluídas
//     return Results.Ok(ctx.Tarefas.Where(x => x.Status == "Concluída").ToList());
// });

app.UseCors("Acesso Total");
app.Run();