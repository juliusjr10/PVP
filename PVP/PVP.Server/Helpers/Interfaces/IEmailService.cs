namespace PVP.Server.Helpers.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(string email, string subject, string message);
    }
}
