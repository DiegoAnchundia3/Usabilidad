-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "tipoUsuario" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "fechaRegistro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Animal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "raza" TEXT,
    "edad" INTEGER,
    "estado" TEXT NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT,
    "foto" TEXT,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Adopcion" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fechaAdopcion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Adopcion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HistoriaExito" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoriaExito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donacion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Donacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RegistroMedico" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "RegistroMedico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Voluntariado" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "actividad" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Voluntariado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HogarTemporal" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3),
    "estado" TEXT NOT NULL,

    CONSTRAINT "HogarTemporal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Adopcion" ADD CONSTRAINT "Adopcion_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Adopcion" ADD CONSTRAINT "Adopcion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HistoriaExito" ADD CONSTRAINT "HistoriaExito_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donacion" ADD CONSTRAINT "Donacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegistroMedico" ADD CONSTRAINT "RegistroMedico_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RegistroMedico" ADD CONSTRAINT "RegistroMedico_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Voluntariado" ADD CONSTRAINT "Voluntariado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HogarTemporal" ADD CONSTRAINT "HogarTemporal_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HogarTemporal" ADD CONSTRAINT "HogarTemporal_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
