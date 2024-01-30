/*
  Warnings:

  - You are about to drop the `Departamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Empleado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Persona` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Empleado] DROP CONSTRAINT [Empleado_departamentoId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Empleado] DROP CONSTRAINT [Empleado_personaId_fkey];

-- DropTable
DROP TABLE [dbo].[Departamento];

-- DropTable
DROP TABLE [dbo].[Empleado];

-- DropTable
DROP TABLE [dbo].[Persona];

-- CreateTable
CREATE TABLE [dbo].[Person] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [birthDate] DATE NOT NULL,
    [address] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    CONSTRAINT [Person_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Employee] (
    [id] INT NOT NULL IDENTITY(1,1),
    [personId] INT NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [Employee_active_df] DEFAULT 1,
    [departmentId] INT NOT NULL,
    CONSTRAINT [Employee_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Employee_personId_key] UNIQUE NONCLUSTERED ([personId])
);

-- CreateTable
CREATE TABLE [dbo].[Department] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [active] BIT NOT NULL CONSTRAINT [Department_active_df] DEFAULT 1,
    CONSTRAINT [Department_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Employee] ADD CONSTRAINT [Employee_personId_fkey] FOREIGN KEY ([personId]) REFERENCES [dbo].[Person]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Employee] ADD CONSTRAINT [Employee_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[Department]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
