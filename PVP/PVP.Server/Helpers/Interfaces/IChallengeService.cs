﻿using PVP.Server.Dtos;
using PVP.Server.Models;

namespace PVP.Server.Helpers.Interfaces
{
    public interface IChallengeService
    {
        Task<bool> AddChallenge(AddChallengeDTO dto);
        Task<bool> CreateChallengeRequest(int senderId,int habitId, CreateChallengeRequestDTO dto);
        Task<bool> AcceptChallenge(int challengeRequestId);

        Task<ICollection<ChallengeRequest>> GetChallengeRequests(int userId);
        Task<bool> DeclineChallengeRequest(int requestId);
    }
}
