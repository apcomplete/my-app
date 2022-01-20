import React from 'react';

type Player = {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
};

type Team = {
  id: number;
  players: {
    id: number;
    firstName: string;
    lastName: string;
  }[];
};

const player: Player = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  dob: '06/26/1987',
};

const team: Team = {
  id: 7,
  players: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    }
  ]
};

const getPlayer = async (id: number): Promise<Player> => {
  const response = await fetch(`/api/v1/players/${id}`, { method: 'get' });
  return await response.json();
};

const getTeam = async (id: number): Promise<Team> => {
  const response = await fetch(`/api/v1/teams/${id}`, { method: 'get' });
  return await response.json();
};

const getNominalPlayerData = async({ id }: Player): Promise<object> => {
  const response = await fetch(`/api/v1/players/${id}/stats`, { method: 'get' });
  return await response.json();
};

getNominalPlayerData(player);
getNominalPlayerData(team.players[0]);

const getStructuralPlayerData = async({ id }: { id: number }): Promise<object> => {
  const response = await fetch(`/api/v1/players/${id}/stats`, { method: 'get' });
  return await response.json();
};

getStructuralPlayerData(player);
getStructuralPlayerData(team.players[0]);
