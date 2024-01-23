BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Persona] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [apellidoPaterno] NVARCHAR(1000) NOT NULL,
    [apellidoMaterno] NVARCHAR(1000) NOT NULL,
    [fechaNacimiento] DATETIME2 NOT NULL,
    [direccion] NVARCHAR(1000),
    [telefono] NVARCHAR(1000),
    CONSTRAINT [Persona_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Empleado] (
    [id] INT NOT NULL IDENTITY(1,1),
    [personaId] INT NOT NULL,
    [activo] BIT NOT NULL CONSTRAINT [Empleado_activo_df] DEFAULT 1,
    [departamentoId] INT NOT NULL,
    CONSTRAINT [Empleado_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Empleado_personaId_key] UNIQUE NONCLUSTERED ([personaId])
);

-- CreateTable
CREATE TABLE [dbo].[Departamento] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nombre] NVARCHAR(1000) NOT NULL,
    [descripcion] NVARCHAR(1000),
    [activo] BIT NOT NULL CONSTRAINT [Departamento_activo_df] DEFAULT 1,
    CONSTRAINT [Departamento_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Empleado] ADD CONSTRAINT [Empleado_personaId_fkey] FOREIGN KEY ([personaId]) REFERENCES [dbo].[Persona]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Empleado] ADD CONSTRAINT [Empleado_departamentoId_fkey] FOREIGN KEY ([departamentoId]) REFERENCES [dbo].[Departamento]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
