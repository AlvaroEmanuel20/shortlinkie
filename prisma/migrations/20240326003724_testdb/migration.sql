-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "QrCodeConfig" (
    "configId" TEXT NOT NULL,
    "color" TEXT DEFAULT '#000',
    "size" INTEGER DEFAULT 180,
    "logo" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "QrCodeConfig_pkey" PRIMARY KEY ("configId")
);

-- CreateTable
CREATE TABLE "ShortUrl" (
    "shortId" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("shortId")
);

-- CreateTable
CREATE TABLE "Click" (
    "clickId" TEXT NOT NULL,
    "source" TEXT,
    "isQrCode" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shortId" TEXT NOT NULL,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("clickId")
);

-- CreateTable
CREATE TABLE "InvalidToken" (
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InvalidToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "token" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "ResetPassToken" (
    "token" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ResetPassToken_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarUrl_key" ON "User"("avatarUrl");

-- CreateIndex
CREATE UNIQUE INDEX "QrCodeConfig_userId_key" ON "QrCodeConfig"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_title_key" ON "ShortUrl"("title");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_key" ON "VerificationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassToken_userId_key" ON "ResetPassToken"("userId");

-- AddForeignKey
ALTER TABLE "QrCodeConfig" ADD CONSTRAINT "QrCodeConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortUrl" ADD CONSTRAINT "ShortUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortId_fkey" FOREIGN KEY ("shortId") REFERENCES "ShortUrl"("shortId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvalidToken" ADD CONSTRAINT "InvalidToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResetPassToken" ADD CONSTRAINT "ResetPassToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
