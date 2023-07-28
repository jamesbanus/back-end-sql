module.exports = {
  addUser: (name, email, password) => {
    return `INSERT INTO users
    (name, email, password) 
      VALUES 
        ("${name}", "${email}", "${password}")`;
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
  updateName: (name, userid) => {
    return `UPDATE users SET name = "${name}" WHERE id LIKE "${userid}";`;
  },
  updateEmail: (email, userid) => {
    return `UPDATE users SET email = "${email}" WHERE id LIKE "${userid}";`;
  },
  updatePassword: (password, userid) => {
    return `UPDATE users SET password = "${password}" WHERE id LIKE "${userid}";`;
  },
  updateRating: (rating, userid, movieid) => {
    return `UPDATE user_actions SET rating = "${rating}" WHERE user_id LIKE "${userid}" AND movie_id LIKE "${movieid}";`;
  },
  updateFavourite: (favourite, userid, movieid) => {
    return `UPDATE user_actions SET favourite = "${favourite}" WHERE user_id LIKE "${userid}" AND movie_id LIKE "${movieid}";`;
  },
};
