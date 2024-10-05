BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Data] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [pageid] NVARCHAR(1000),
    [isactive] BIT NOT NULL CONSTRAINT [Data_isactive_df] DEFAULT 1,
    [desc] NVARCHAR(1000),
    [parentid] NVARCHAR(1000),
    [path] NVARCHAR(1000),
    [pagetype] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [metatitle] NVARCHAR(1000),
    [metadescription] NVARCHAR(1000),
    [seosection] NVARCHAR(1000),
    [icon] NVARCHAR(1000),
    [booknowurl] NVARCHAR(1000),
    [video] NVARCHAR(1000),
    [smallimage] NVARCHAR(1000),
    [smalltext] NVARCHAR(1000),
    [headerimage] NVARCHAR(1000),
    [imageTitle] NVARCHAR(1000),
    [section1] NVARCHAR(1000),
    [sectionImage] NVARCHAR(1000),
    [section2] NVARCHAR(1000),
    [section2Image] NVARCHAR(1000),
    [Seoheader] NVARCHAR(1000),
    [ruleyes] NVARCHAR(1000),
    [ruleno] NVARCHAR(1000),
    [warnings] NVARCHAR(1000),
    [booknowlink] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Data_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Data_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Blog] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [tags] NVARCHAR(1000),
    [shortdesc] NVARCHAR(1000),
    [format] NVARCHAR(1000),
    [image] NVARCHAR(1000),
    [video] NVARCHAR(1000),
    [postdate] NVARCHAR(1000),
    [views] INT NOT NULL CONSTRAINT [Blog_views_df] DEFAULT 0,
    [author] NVARCHAR(1000),
    [htmldesc] NVARCHAR(1000),
    CONSTRAINT [Blog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BlogReviews] (
    [id] INT NOT NULL IDENTITY(1,1),
    [comment] NVARCHAR(1000) NOT NULL,
    [user] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BlogReviews_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [BlogReviews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Locations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [map] NVARCHAR(1000),
    [locationid] NVARCHAR(1000),
    [hours] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [desc] NVARCHAR(1000),
    [smallimage] NVARCHAR(1000),
    [tag] NVARCHAR(1000),
    [rollerurl] NVARCHAR(1000),
    [facebook] NVARCHAR(1000),
    [insta] NVARCHAR(1000),
    [twitter] NVARCHAR(1000),
    [tiktok] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Locations_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Locations_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Config] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [key] NVARCHAR(1000),
    [value] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Config_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Config_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Promo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [promo] NVARCHAR(1000),
    [img] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [startdate] DATETIME2 NOT NULL,
    [enddate] DATETIME2 NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Promo_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Promo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BirthdayPackages] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [plantitle] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [price] NVARCHAR(1000),
    [period] NVARCHAR(1000),
    [includes] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BirthdayPackages_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [BirthdayPackages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FAQ] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [question] NVARCHAR(1000),
    [answer] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [FAQ_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [FAQ_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
