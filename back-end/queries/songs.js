const db = require('../db/dbConfig');

const getAllSongs = async () => {
    try {
        const allSongs = await db.any("SELECT * FROM songs;");
        return allSongs;
    } catch (e) {
        return e;
    }

};

const getOneSong = async (id) => {
    try {
        const song = await db.one("SELECT * FROM songs WHERE id=$1", id)
        return song
    } catch (e) {
        return e
    }
};

const createSong = async (createdSong) => {
    const { name, artist, album, time, is_favorite } = createdSong

    try {
        const newSong = await db.one("INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, artist, album, time, is_favorite])
        return newSong;
    } catch (e) {
        return e
    }
};

const deleteSong = async (id) => {
    try {
        const deletedSong = await db.one("DELETE FROM songs WHERE id=$1 RETURNING *", id)
        return deletedSong
    } catch (e) {
        return e
    }
};

const updateSong = async (id, body) => {
    const { name, artist, album, time, is_favorite } = body;
    try {
        const updatedSong = await db.one("UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *", [name, artist, album, time, is_favorite, id]);
        return updatedSong;
    } catch (e) {
        return e
    }
};

module.exports = {
    getAllSongs,
    getOneSong,
    createSong,
    deleteSong,
    updateSong
}