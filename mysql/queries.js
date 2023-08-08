module.exports = {
  addUser: (name, email, sha256Password) => {
    return `INSERT INTO users
    (name, email, password) 
      VALUES 
        ("${name}", "${email}", "${sha256Password}")`;
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
          WHERE id LIKE ${userid};`;
  },
  deleteUserActions: (userid) => {
    return `DELETE
    FROM user_actions 
      WHERE user_id LIKE ${userid};`;
  },
  getUser: (userid) => {
    return `SELECT * 
    FROM users 
      WHERE id LIKE ${userid};`;
  },
  getUserActionId: (userid) => {
    return `SELECT * 
    FROM user_actions 
      WHERE user_id LIKE ${userid};`;
  },
  getUserActionMovie: (movieid) => {
    return `SELECT * 
    FROM user_actions 
      WHERE movie_id LIKE ${movieid};`;
  },
  updateUser: (key, value, userid) => {
    return `UPDATE users SET "${key}" = "${value}" WHERE id LIKE "${userid}";`;
  },
  updateAction: (key, value, userid, movieid) => {
    return `UPDATE user_actions SET "${key}" = "${value}" WHERE user_id LIKE "${userid}" AND movie_id LIKE "${movieid}";`;
  },
  checkUserCreds: (email, sha256Password) => {
    return `SELECT id FROM users where email LIKE "${email}"
    AND password like "${sha256Password}";`;
  },
  addToken: (userid, token) => {
    return `INSERT INTO tokens (user_id, token)
    VALUES ("${userid}", "${token}")`;
  },
  getIDbyToken: (token) => {
    return `SELECT user_id FROM tokens
    WHERE token LIKE "${token}";`;
  },
};
