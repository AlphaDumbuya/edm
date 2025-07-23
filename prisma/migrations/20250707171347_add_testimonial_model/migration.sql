-- CreateTable
CREATE TABLE "Testimonial" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
