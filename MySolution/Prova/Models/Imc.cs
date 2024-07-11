namespace API.Models;

public class Imc
{
    public string ImcId { get; set; } = Guid.NewGuid().ToString();
    public double Peso { get; set; }
    public double Altura { get; set; }
    public double Imcs { get; set; }
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public int AlunoId { get; set; }
}