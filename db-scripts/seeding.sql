-- Add user to table
INSERT INTO users (uid, username, password, role, email, brandname, website, profilepicture) 
VALUES 
    (1, 'catherinexoxo', SHA2('password123', 256), 'user', 'user1@example.com', NULL , NULL,'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733448028/pfp1_xgoda1.jpg'),
    (2, 'kittykat', SHA2('password123', 256), 'user', 'user2@example.com', NULL , NULL,'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733448029/pfp5_obzigi.jpg'),
    (3, 'love_fashion', SHA2('password123', 256), 'user', 'user3@example.com', NULL , NULL,'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733448029/pfp4_gqhyx8.jpg'),
    (4, 'prettygirl', SHA2('password123', 256), 'user', 'user1@example.com', NULL , NULL,'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733450041/pfp2_pilws9.jpg'),
    (5, 'meow', SHA2('password123', 256), 'user', 'user2@example.com', NULL , NULL,'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733448029/pfp6_bgzilm.jpg'),
    (6, 'JaysFits', SHA2('password123', 256), 'user', 'user3@example.com', NULL , NULL,'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733436811/anime-profile_mkwist.jpg'),
    (7, 'HMFashion', SHA2('password456', 256), 'business', 'marketing@hmcanada.com', 'H&M', 'https://www2.hm.com/en_ca/index.html', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733386844/hm_logo_muo0ho.png'),
    (8, 'BananaRepublic', SHA2('password456', 256), 'business', 'marketing@brcanada.com', 'Banana Republic', 'https://bananarepublic.gap.com/','https://res.cloudinary.com/dxqfbccjh/image/upload/v1733386847/hamter_g57iw5.jpg'),
    (9, 'Admin1', SHA2('adminpassword', 256), 'admin', 'admin1@example.com', NULL , NULL,'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733386847/hamter_g57iw5.jpg'),
    (10, 'ZARA', SHA2('password456', 256), 'business', 'marketing@brcanada.com', 'ZARA', 'https://www.zara.com/us/','https://res.cloudinary.com/dxqfbccjh/image/upload/v1733617403/co5riotdgdd21_dob4iv.jpg'),
    (11, 'ARITZIA', SHA2('password456', 256), 'business', 'marketing@brcanada.com', 'ARITZIA', 'https://www.aritzia.com/en/clothing','https://res.cloudinary.com/dxqfbccjh/image/upload/v1733617637/Aritzia_Logo-2400x1569_m40try.png');

-- Delete user1 
-- DELETE FROM Users
-- WHERE uid = 1;

-- Update password of user1
-- UPDATE Users 
-- SET password = “password789”
-- WHERE uid = 1;

-- Update business brand_name
-- UPDATE Users 
-- SET brand_name = “Hennes & Mauritz”
-- WHERE uid = 2; // or username = “hm”

-- Update business websites
-- UPDATE Users 
-- SET website = “www.hmcanada.ca”
-- WHERE uid = 2; // or username = “hm”

-- Insert sample wardrobe items
INSERT INTO wardrobe (wid, uid, itemtype, name, picture, otherDetails)
VALUES
    (1, 1, 'Top', 'White Chunky Cardigan', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733436940/white-sweater-cardigan_ptzy8f.jpg', 'A gift from my mom!'),
    (2, 1, 'Dress', 'Green Fancy Dress', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437013/green-dress_xdwwqh.jpg', 'Perfect for dressing up!'),
    (3, 1, 'Accessory', 'Silver Earrings', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733436950/silver-earrings_kuxivm.jpg', 'A chic earrings from an a local shop'),
    (4, 1, 'Top', 'Brown Long-Sleeve Top', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437061/brown-sweater_thugm8.jpg', 'Super cute for colder months'),
    (5, 1, 'Bottom', 'Blue Denim', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733436998/denim-jeans_xzryww.jpg', 'All time favourite pair of denim!'),
    (6, 1, 'Shoes', 'Black Boots', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733436972/black-boots_ith295.jpg', 'Everyone needs a classic pair of boots!'),
    (7, 1, 'Bottom', 'Grey Business Pants', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437093/grey-trousers_pkuart.jpg', 'Can dress these up or down, great overall!'),
    (8, 1, 'Top', 'Blue Pastel Hoodie', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437119/pastel-blue-hoodie_bjjg12.jpg', 'Super comfortable for those long uni days!'),
    (9, 1, 'Bottom', 'Grey Aritzia Sweatpants', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437080/grey-sweatpants_si1fhx.jpg', 'For those lazy lounge days! Pairs well with my blue hoodie!'),
    (10, 1, 'Accessory', 'Pink Wool Scarf', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437136/pink-scarf_yubvjv.jpg', 'My new wool scarf, so warm and soft!'),
    (11, 2, 'Top', 'Brown Wool Sweater', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437038/brown-wool-sweater_etus38.jpg', 'Comfy and warm sweater'),
    (12, 2, 'Bottom', 'Black Leather Pants', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437103/leather-pants_alquos.jpg', 'Great for going out, so versatile!'),
    (13, 2, 'Bottom', 'Grey Trousers', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437070/grey-business-pants_jhsarp.jpg', 'My favourite to wear at my internship!'),
    (14, 2, 'Top', 'Pink Cardigan', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437127/pink-cardigan_bjbunu.jpg', 'Chic for the winter time!'),
    (15, 6, 'Top', 'Red Rugby Sweater', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437178/mens-rugby-sweater_xeb8bz.jpg', 'Fave for playing rugby with the mates!'),
    (16, 6, 'Top', 'Blue Nike Hoodie', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437167/mens-nike-hoodie_rd0amh.jpg', 'For those long coding days!'),
    (17, 6, 'Top', 'Blue Dress Shirt', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437159/mens-dress-shirt_mk4gs7.jpg', 'Good for weddings or a day at the office!'),
    (18, 6, 'Bottom', 'Green Chinos', 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437150/mens-chinos_tvgyix.jpg', 'Best work pants to wear at my internship!');
    
-- For a certain type of clothing for drop down
-- SELECT DISTINCT ItemType
-- FROM Wardrobe;

-- group a user’s wardrobe by type each type has 
-- SELECT Wid, ItemType, name, picture, other_details
-- FROM Wardrobe
-- WHERE Uid = 1
-- ORDER BY ItemType;

-- Count amount of items in each item type
-- SELECT ItemType, COUNT(*) AS ItemCount
-- FROM Wardrobe
-- WHERE Uid = 1
-- GROUP BY ItemType;


INSERT INTO userpost (pid, uid, picture, title, avgrating, flag)
VALUES
    (1, 6, 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733386845/prettywoman1_mydwfr.jpg', 'My new outfit', 2, FALSE),
    (2, 3, 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733386845/prettywoman2_ev8oma.jpg', 'cool oufit', 3.5, FALSE),
    (3, 4, 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733386845/prettywoman3_g3uynm.jpg', 'rate me!!', 1, FALSE),
    (4, 2, 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733386849/prettywoman4_evw2lk.jpg', 'look at this', 5, FALSE),
    (5, 5, 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437181/outfit5_gjsobb.jpg', 'what do you guys think?', 4, FALSE),
    (6, 1, 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437181/outfit6_imeonf.jpg', 'my comfort fit', 2.6, FALSE),
    (7, 6, 'https://res.cloudinary.com/dxqfbccjh/image/upload/v1733437181/outfit7_iubh7x.jpg', 'should i wear this to grad?', 3.8, FALSE);

-- Queries

-- Grab user post based on flag value of 1:
-- SELECT *
-- FROM userpost
-- WHERE flag = 1;

-- grab user posts based on uid = 3
-- SELECT *
-- FROM userpost
-- WHERE uid = 3;

-- Flag a specific user post
-- UPDATE userpost
-- SET flag = 1
-- WHERE pid = 1;

INSERT INTO userrating (rid, pid, uid, rating)
VALUES
    (1, 1, 1, 2),
    (2, 2, 3, 3.5),
    (3, 3, 2, 1),
    (4, 4, 2, 5),
    (5, 5, 3, 4),
    (6, 6, 1, 2.6),
    (7, 7, 1, 3.8);

-- Queries

-- get average of ratign for one post
-- SELECT pid, AVG(rating) AS avg_rating_of_post
-- FROM userrating
-- WHERE pid = 1
-- GROUP BY pid;

INSERT INTO brandpost (pid, uid, picture, flag) 
VALUES 
    (1, 7, 'https://image.hm.com/assets/hm/1e/e6/1ee60900d682e151222d978cc215c986e2df5c89.jpg?imwidth=1260', FALSE),
    (2, 7, 'https://image.hm.com/assets/hm/61/1f/611fafb8cf4020f1e585b01f9f5e75d70724e51f.jpg?imwidth=1260', FALSE),
    (3, 10, 'https://static.zara.net/assets/public/7e2f/4e4d/d6ff4bf48c4e/f0402835a8e3/08805707800-p/08805707800-p.jpg?ts=1724840991537&w=750', FALSE),
    (4, 8, 'https://static.zara.net/assets/public/2e06/076d/07894f58a4d6/e993901ab75d/06718965916-p/06718965916-p.jpg?ts=1733312952411&w=750', FALSE),
    (5, 11, 'https://assets.aritzia.com/image/upload/large/f24_a01_118415_1274_on_a.jpg', FALSE),
    (6, 7, 'https://image.hm.com/assets/hm/93/f3/93f3d455b0702ebf8cf6a362ea2147275c53010e.jpg?imwidth=1260', FALSE),
    (7, 7, 'https://image.hm.com/assets/hm/dd/a7/dda7cd559f31749a4853ba2330292834c9bd12a4.jpg?imwidth=1260', FALSE);

-- Queries

-- Get photo from a Brand Post
-- SELECT Picture
-- FROM BrandPost
-- WHERE pid = 1;

-- Get all flagged Brand Posts
-- SELECT pid, Picture, flag
-- FROM BrandPost
-- WHERE flag = 0;

-- Delete a specific Brand Post
-- DELETE 
-- FROM BrandPost
-- WHERE pid = 1;

-- Flag a specific Brand Post
-- UPDATE BrandPost
-- SET flag = 1
-- WHERE pid = 1;

INSERT INTO brandpostdetails (bpdid, pid, itemtype, URL, clicks) 
VALUES 
    (1, 1, 'Sweater', 'https://www2.hm.com/en_ca/productpage.1268715001.html', 0),
    (2, 1, 'Skirt', 'https://www2.hm.com/en_ca/productpage.1246595001.html', 0),
    (3, 2, 'Dress', 'https://www2.hm.com/en_ca/productpage.1252066001.html', 0),
    (4, 2, 'Earrings', 'https://www2.hm.com/en_ca/productpage.1258220001.html', 0),
    (7, 3, 'Blazer', 'https://www.zara.com/us/en/fitted-blazer-with-shoulder-pads-zw-collection-p08805797.html?v1=423198303&v2=2420942', 0),
    (8, 3, 'Skirt', 'https://www.zara.com/us/en/long-tube-skirt-zw-collection-p08952207.html?v1=402153955&v2=2420430', 0),
    (9, 4, 'Jacket', 'https://www.zara.com/us/en/cotton-blend-jacket-with-pockets-p06718965.html?v1=410467510&v2=2434592', 0),
    (10, 4, 'Pants', 'https://www.zara.com/us/en/straight-leg-pleated-wool-trousers-co-ord-p05009710.html?v1=390494498&v2=2434592', 0),
    (11, 5, 'Top', 'https://www.aritzia.com/en/product/contour-tube-top/118415.html?dwvar_118415_color=1274', 0),
    (12, 6, 'Dress', 'https://www2.hm.com/en_ca/productpage.1253255004.html', 0),
    (13, 7, 'Top', 'https://www2.hm.com/en_ca/productpage.1247686003.html', 0);

-- Queries

-- Get Item types, URLs, and # of clicks for a specific Brand Post (Analytics query)
-- SELECT bd.ItemType, bd.URL, bd.Clicks
-- FROM BrandPostDetails bd, BrandPost bp
-- WHERE bd.pid = bp.pid AND bd.pid = 1;

-- Delete Brand Post Details for a specific Brand Post (Run before deleting brand post itself)
-- DELETE 
-- FROM BrandPostDetails
-- WHERE pid = 1;

-- Update # of clicks for a specific Brand Post and ItemType
-- UPDATE BrandPostDetails
-- SET Clicks = 100
-- WHERE pid = 1 AND ItemType = ‘Sweater’;
