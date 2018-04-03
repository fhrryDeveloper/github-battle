import axios from 'axios';
require('dotenv').config();

const id = process.env.GITHUB_CLIENT_ID;
const sec = process.env.GITHUB_CLIENT_SECRET;
const params = `?client_id=${id}&client_secret=${sec}`;

export const fetchPopularRepos = async language => {
    const encodedURI = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    const repos = await axios.get(encodedURI).catch(handleError);
    return repos.data.items;
};

export const battle = async players => {
    const results = await Promise.all(players.map(getUserData)).catch(
        handleError
    );

    return results === null ? results : sortPlayers(results);
};

const getProfile = async username => {
    const profile = await axios.get(
        `https://api.github.com/users/${username}${params}`
    );
    return profile.data;
};

const getRepos = username => {
    return axios.get(
        `https://api.github.com/users/${username}/repos${params}&per_page=100`
    );
};

const getStarCount = repos => {
    return repos.data.reduce(
        (count, { stargazers_count }) => count + stargazers_count,
        0
    );
};

const calculateScore = ({ followers }, repos) => {
    return followers * 3 + getStarCount(repos);
};

const getUserData = async player => {
    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player)
    ]);

    return {
        profile,
        score: calculateScore(profile, repos)
    };
};

const sortPlayers = players => {
    return players.sort((a, b) => b.score - a.score);
};

const handleError = error => {
    console.warn(error);
    return null;
};
