-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ShortUrl" (
    "shortId" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("shortId")
);

-- CreateTable
CREATE TABLE "Source" (
    "name" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "shortId" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarUrl_key" ON "User"("avatarUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_title_key" ON "ShortUrl"("title");

-- AddForeignKey
ALTER TABLE "ShortUrl" ADD CONSTRAINT "ShortUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Source" ADD CONSTRAINT "Source_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES "ShortUrl"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;
