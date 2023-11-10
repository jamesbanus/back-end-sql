module.exports = {
  addUser: (email, sha256Password) => {
    return `INSERT INTO users
    (email, password) 
      VALUES 
        ("${email}", "${sha256Password}")`;
  },
  addRating: (user_id, movie_id, rating) => {
    return `INSERT INTO user_actions
    (user_id, movie_id, favourite, rating) 
      VALUES 
        ("${user_id}", "${movie_id}", "0", "${rating}")`;
  },
  addFavourite: (user_id, movie_id, favourite) => {
    return `INSERT INTO user_actions
    (user_id, movie_id, favourite, rating) 
      VALUES 
        ("${user_id}", "${movie_id}", "${favourite}", "0")`;
  },
  deleteUser: (userid) => {
    return `DELETE
        FROM users 
          WHERE id = ${userid};`;
  },
  deleteUserActions: (userid) => {
    return `DELETE
    FROM user_actions 
      WHERE user_id = ${userid};`;
  },
  getUser: (userid) => {
    return `SELECT * 
    FROM users 
      WHERE id = ${userid};`;
  },
  getUserActionId: (userid) => {
    return `SELECT * 
    FROM user_actions 
      WHERE user_id = ${userid};`;
  },
  getUserActionMovie: (movieid) => {
    return `SELECT * 
    FROM user_actions 
      WHERE movie_id = ${movieid};`;
  },
  getUserActionAllIDs: (userid, movieid) => {
    return `SELECT * 
    FROM user_actions 
      WHERE user_id = ${userid} AND movie_id = ${movieid};`;
  },
  updateUser: (key, value, userid) => {
    return `UPDATE users SET "${key}" = "${value}" WHERE id = "${userid}";`;
  },
  updateAction: (key, value, userid, movieid) => {
    return `UPDATE user_actions SET "${key}" = "${value}" WHERE user_id = "${userid}" AND movie_id = "${movieid}";`;
  },
  checkUserCreds: (email, sha256Password) => {
    return `SELECT id FROM users where email = "${email}"
    AND password = "${sha256Password}";`;
  },
  addToken: (userid, token) => {
    return `INSERT INTO tokens (user_id, token)
    VALUES ("${userid}", "${token}")`;
  },
  getIDbyToken: (token) => {
    return `SELECT user_id FROM tokens
    WHERE token = "${token}";`;
  },
};
