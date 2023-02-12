-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "pathName" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "animals" TEXT,
    "trees" TEXT,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);
