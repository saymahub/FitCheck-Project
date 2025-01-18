CREATE DATABASE IF NOT EXISTS fitcheckdatabase;
USE fitcheckdatabase;

CREATE TABLE IF NOT EXISTS users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL, -- Store hashed password
    role VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    brandname VARCHAR(255),
    website VARCHAR(255),
    profilepicture VARCHAR(255) DEFAULT 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733602539/profile_picturedefault.png',
    UNIQUE (username, email)
);

CREATE TABLE IF NOT EXISTS wardrobe (
    wid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    itemtype VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL, 
    picture VARCHAR(255) NOT NULL,
    otherdetails VARCHAR(255) NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(uid)
);

CREATE TABLE IF NOT EXISTS userpost (
    pid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    picture VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    avgrating DECIMAL(3, 1),
    flag BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (uid) REFERENCES users(uid)
);

CREATE TABLE IF NOT EXISTS userrating (
    rid INT AUTO_INCREMENT PRIMARY KEY,
    pid INT NOT NULL,
    uid INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (uid) REFERENCES users(uid),
    FOREIGN KEY (pid) REFERENCES userpost(pid),
    UNIQUE (pid, uid)
);

CREATE TABLE IF NOT EXISTS brandpost (
    pid INT AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL,
    picture VARCHAR(255) NOT NULL,
    flag BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (uid) REFERENCES users(uid)
);

CREATE TABLE IF NOT EXISTS brandpostdetails (
    bpdid INT AUTO_INCREMENT PRIMARY KEY,
    pid INT,
    itemtype VARCHAR(255) NOT NULL,
    URL VARCHAR(255) NOT NULL,
    clicks INT NOT NULL,
    FOREIGN KEY (pid) REFERENCES brandpost(pid)
);
