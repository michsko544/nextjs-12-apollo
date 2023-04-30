-- CreateTable
CREATE TABLE "Novel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorsOnNovels" (
    "novelId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "AuthorsOnNovels_pkey" PRIMARY KEY ("novelId","authorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- AddForeignKey
ALTER TABLE "AuthorsOnNovels" ADD CONSTRAINT "AuthorsOnNovels_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorsOnNovels" ADD CONSTRAINT "AuthorsOnNovels_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
