﻿namespace PVP.Server.Helpers
{
    public interface IEmailService
    {
        void SendEmail(string email, string subject, string message);
    }
}
