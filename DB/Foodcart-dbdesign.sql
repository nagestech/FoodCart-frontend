CREATE TABLE "workers" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "age" int(255) NOT NULL,
  "address" varchar(255) NOT NULL,
  "city" varchar(255) NOT NULL,
  "state" varchar(255) NOT NULL,
  "pincode" int(255) NOT NULL,
  "latitude" double NOT NULL,
  "longtitude" double NOT NULL,
  "mobile" bit UNIQUE NOT NULL,
  "drivinglicence" int(255) NOT NULL,
  "licenceno" blob,
  "vehicleno" int(255) NOT NULL,
  "rcbookno" blob,
  "bankacno" int(255) NOT NULL,
  "ifsccode" int(255) NOT NULL,
  "bankpassbook" blob,
  "upinumber" int(255) NOT NULL,
  "status" bit NOT NULL,
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "addtocart" (
  "cartid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "foodid" int NOT NULL,
  "quantity" int(255) NOT NULL,
  "restaurantid" int(255),
  "subtotal" int(255) NOT NULL
);

CREATE TABLE "customerorder" (
  "orderid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "cartid" int,
  "driverid" int,
  "restaurantid" int,
  "latitude" double NOT NULL,
  "longtitude" double NOT NULL,
  "distance" int(255) NOT NULL
);

CREATE TABLE "customerorderhistory" (
  "hid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "orderid" int,
  "driverid" int,
  "restaurantid" int,
  "paymenthistory" int NOT NULL,
  "date" date NOT NULL,
  "time" timestamptz[default] NOT NULL
);

CREATE TABLE "customer" (
  "customerid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "customername" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "mobile" bit UNIQUE NOT NULL,
  "address" int(255) NOT NULL,
  "city" varchar(255) NOT NULL,
  "state" varchar(255) NOT NULL,
  "pincode" int(255) NOT NULL,
  "upinumber" int(255) NOT NULL,
  "date" int(255) NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "restaurant" (
  "restaurantid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "restaurantname" varchar(255) NOT NULL,
  "address" varchar(255) NOT NULL,
  "city" varchar(255) NOT NULL,
  "state" varchar(255) NOT NULL,
  "pincode" int(255) NOT NULL,
  "latitude" double NOT NULL,
  "longtitude" double NOT NULL,
  "mobile" bit UNIQUE NOT NULL,
  "email" varchar(255) NOT NULL,
  "subscription" varchar(255) NOT NULL,
  "fssaino" int(255) NOT NULL,
  "fssai" blob,
  "status" bit NOT NULL,
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "restaurantpayment" (
  "paymentid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "orderid" int,
  "amount" int(255),
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "restaurantwallet" (
  "paymentid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "restaurantid" int,
  "totalorders" int NOT NULL,
  "totalamount" int NOT NULL,
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "dealer" (
  "dealerid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "dealername" varchar(255) NOT NULL,
  "restaurantid" int,
  "address" varchar(255) NOT NULL,
  "mobile" bit UNIQUE NOT NULL,
  "Bankac" int(255) NOT NULL,
  "Bankifsc" int(255) NOT NULL,
  "Upino" int(255) NOT NULL,
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "agentorders" (
  "deliveryid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "orderid" int,
  "customerid" int,
  "restaurantid" int,
  "customerorder" int,
  "driverid" int,
  "latitude" double NOT NULL,
  "longtitude" double NOT NULL,
  "distance" int(255) NOT NULL,
  "deliverystatus" varchar(255) NOT NULL,
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now()),
  "location" varchar(255) NOT NULL
);

CREATE TABLE "paymentag" (
  "paymentid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "orderid" int,
  "distance" int(255) NOT NULL,
  "amount" int(255) NOT NULL,
  "driverid" int NOT NULL,
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "agentwallet" (
  "walletid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "paymentid" int,
  "driverid" int,
  "totalorders" int(255) NOT NULL,
  "data" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now()),
  "workinghrs" int(255)
);

CREATE TABLE "Agentrating" (
  "ratingid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "customerid" int,
  "driverid" int,
  "rating" int(255) NOT NULL,
  "comment" varchar(255) NOT NULL,
  "date" Date NOT NULL
);

CREATE TABLE "restaurantrating" (
  "ratingid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "customerid" int,
  "restaurantid" int,
  "rating" int(255) NOT NULL,
  "comment" varchar(255) NOT NULL,
  "date" Date NOT NULL
);

CREATE TABLE "food" (
  "foodid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "foodname" varchar(255),
  "customerid" int(255),
  "categeryid" varchar(255),
  "price" int(255) NOT NULL,
  "foodtype" varchar(255) NOT NULL,
  "foodtiming" varchar(255) NOT NULL,
  "restuarantid" varchar
);

CREATE TABLE "foodcategory" (
  "categeryid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "categorytype" varchar(255) NOT NULL
);

CREATE TABLE "payment" (
  "paymentid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "orderid" int,
  "customerid" int,
  "driverid" int,
  "foodid" int,
  "amount" int(255) NOT NULL,
  "paymenttype" varchar(255) NOT NULL,
  "date" date NOT NULL,
  "timing" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "restaurantorders" (
  "orderid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "customerorder" int,
  "customerid" int,
  "restaurantid" int,
  "driverid" int,
  "deliveryid" int,
  "totalamount" int(255) NOT NULL,
  "date" date NOT NULL,
  "time" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "promotion" (
  "promoid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "orderid" int(255),
  "promocode" int(255) NOT NULL,
  "promooffer" int(255) NOT NULL,
  "promoname" varcher(255) NOT NULL,
  "date" date,
  "time" timestamptz
);

CREATE TABLE "subscription" (
  "subscriptionid" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "restaurantid" int,
  "holder" varchar(255),
  "plan" varchar(255),
  "payment" int(255)
);

CREATE TABLE "LogTable" (
  "LogID" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "TableName" VARCHAR(255) NOT NULL,
  "RecordID" INT(255),
  "customerid" int,
  "driverid" int,
  "restaurantid" int,
  "LogDate" DATETIME DEFAULT (CURRENT_TIMESTAMP),
  "OperationType" VARCHAR(10) NOT NULL,
  "OldValue" TEXT NOT NULL,
  "NewValue" TEXT NOT NULL,
  "date" Date,
  "time" timestamptz
);

ALTER TABLE "agentorders" ADD FOREIGN KEY ("customerid") REFERENCES "customer" ("customerid");

ALTER TABLE "agentorders" ADD FOREIGN KEY ("driverid") REFERENCES "workers" ("id");

ALTER TABLE "Agentrating" ADD FOREIGN KEY ("customerid") REFERENCES "customer" ("customerid");

ALTER TABLE "Agentrating" ADD FOREIGN KEY ("driverid") REFERENCES "workers" ("id");

ALTER TABLE "restaurantrating" ADD FOREIGN KEY ("customerid") REFERENCES "customer" ("customerid");

ALTER TABLE "food" ADD FOREIGN KEY ("categeryid") REFERENCES "foodcategory" ("categeryid");

ALTER TABLE "food" ADD FOREIGN KEY ("restuarantid") REFERENCES "restaurant" ("restaurantid");

ALTER TABLE "payment" ADD FOREIGN KEY ("customerid") REFERENCES "customer" ("customerid");

ALTER TABLE "payment" ADD FOREIGN KEY ("driverid") REFERENCES "workers" ("id");

ALTER TABLE "payment" ADD FOREIGN KEY ("foodid") REFERENCES "food" ("foodid");

ALTER TABLE "restaurantorders" ADD FOREIGN KEY ("customerid") REFERENCES "customer" ("customerid");

ALTER TABLE "restaurantorders" ADD FOREIGN KEY ("restaurantid") REFERENCES "restaurant" ("restaurantid");

ALTER TABLE "restaurantorders" ADD FOREIGN KEY ("driverid") REFERENCES "workers" ("id");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "dealer" ("restaurantid");

ALTER TABLE "food" ADD FOREIGN KEY ("foodid") REFERENCES "addtocart" ("foodid");

ALTER TABLE "agentorders" ADD FOREIGN KEY ("orderid") REFERENCES "restaurantorders" ("orderid");

ALTER TABLE "agentorders" ADD FOREIGN KEY ("deliveryid") REFERENCES "payment" ("orderid");

ALTER TABLE "customer" ADD FOREIGN KEY ("customerid") REFERENCES "food" ("customerid");

ALTER TABLE "restaurantorders" ADD FOREIGN KEY ("orderid") REFERENCES "promotion" ("orderid");

ALTER TABLE "payment" ADD FOREIGN KEY ("orderid") REFERENCES "paymentag" ("orderid");

ALTER TABLE "paymentag" ADD FOREIGN KEY ("paymentid") REFERENCES "agentwallet" ("paymentid");

ALTER TABLE "addtocart" ADD FOREIGN KEY ("cartid") REFERENCES "customerorder" ("cartid");

ALTER TABLE "workers" ADD FOREIGN KEY ("id") REFERENCES "customerorder" ("driverid");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "customerorder" ("restaurantid");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "agentorders" ("restaurantid");

ALTER TABLE "customerorder" ADD FOREIGN KEY ("orderid") REFERENCES "restaurantorders" ("customerorder");

ALTER TABLE "agentorders" ADD FOREIGN KEY ("deliveryid") REFERENCES "restaurantorders" ("deliveryid");

ALTER TABLE "customerorder" ADD FOREIGN KEY ("orderid") REFERENCES "agentorders" ("customerorder");

ALTER TABLE "workers" ADD FOREIGN KEY ("id") REFERENCES "paymentag" ("driverid");

ALTER TABLE "workers" ADD FOREIGN KEY ("id") REFERENCES "agentwallet" ("driverid");

ALTER TABLE "restaurantorders" ADD FOREIGN KEY ("orderid") REFERENCES "restaurantpayment" ("orderid");

ALTER TABLE "restaurantpayment" ADD FOREIGN KEY ("paymentid") REFERENCES "restaurantwallet" ("paymentid");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "restaurantwallet" ("restaurantid");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "restaurantrating" ("restaurantid");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "subscription" ("restaurantid");

ALTER TABLE "customer" ADD FOREIGN KEY ("customerid") REFERENCES "LogTable" ("customerid");

ALTER TABLE "workers" ADD FOREIGN KEY ("id") REFERENCES "LogTable" ("driverid");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "LogTable" ("restaurantid");

ALTER TABLE "customerorder" ADD FOREIGN KEY ("orderid") REFERENCES "payment" ("orderid");

ALTER TABLE "workers" ADD FOREIGN KEY ("id") REFERENCES "customerorderhistory" ("driverid");

ALTER TABLE "customerorder" ADD FOREIGN KEY ("orderid") REFERENCES "customerorderhistory" ("orderid");

ALTER TABLE "restaurant" ADD FOREIGN KEY ("restaurantid") REFERENCES "customerorderhistory" ("restaurantid");
