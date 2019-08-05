CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT,
    password TEXT,
    profile_name TEXT,
    profile_image TEXT
);

CREATE TABLE IF NOT EXISTS foodplace (
    foodplace_id SERIAL PRIMARY KEY,
    shopname TEXT,
    address TEXT,
    postalcode TEXT,
    location TEXT,
    image_url TEXT,
    category TEXT,
    user_id INTEGER
);

CREATE TABLE IF NOT EXISTS menu (
    id SERIAL PRIMARY KEY,
    foodname TEXT,
    price TEXT,
    foodimage_url TEXT,
    period TEXT,
    foodplace_id INTEGER
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    rating TEXT,
    comment TEXT,
    shop_id INTEGER,
    user_id INTEGER,
    created_at_time TIME DEFAULT now(),
    created_at_date DATE DEFAULT now()
);