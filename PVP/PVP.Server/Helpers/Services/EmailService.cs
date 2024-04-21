﻿using MimeKit;
using MimeKit.Text;
using PVP.Server.Helpers.Interfaces;
using System.Net;
using System.Net.Mail;

namespace PVP.Server.Helpers.Services
{
    public class EmailService : IEmailService
    {
        public void SendEmail(string email, string subject, string message)
        {
            MailAddress to = new MailAddress(email);
            MailAddress from = new MailAddress("habitbook937@gmail.com");

            MailMessage emailSend = new MailMessage(from, to);
            emailSend.Subject = subject;
            emailSend.Body = message;
            emailSend.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            smtp.Credentials = new NetworkCredential("habitbook937@gmail.com", "ewigujbcssyglxsa");
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.EnableSsl = true;
            try
            {
                smtp.Send(emailSend);
            }
            catch (SmtpException ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
