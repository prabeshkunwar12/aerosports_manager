BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Data] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [pageid] NVARCHAR(1000),
    [isactive] FLOAT(53),
    [desc] NVARCHAR(1000),
    [parentid] NVARCHAR(1000),
    [path] NVARCHAR(1000),
    [pagetype] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [metatitle] NVARCHAR(1000),
    [metadescription] NVARCHAR(max),
    [seosection] NVARCHAR(max),
    [icon] NVARCHAR(1000),
    [booknowurl] NVARCHAR(1000),
    [video] NVARCHAR(1000),
    [smallimage] NVARCHAR(1000),
    [smalltext] NVARCHAR(max),
    [headerimage] NVARCHAR(1000),
    [imageTitle] NVARCHAR(1000),
    [section1] NVARCHAR(max),
    [sectionImage] NVARCHAR(1000),
    [section2] NVARCHAR(max),
    [section2Image] NVARCHAR(1000),
    [Seoheader] NVARCHAR(1000),
    [ruleyes] NVARCHAR(max),
    [ruleno] NVARCHAR(max),
    [warnings] NVARCHAR(max),
    [booknowlink] NVARCHAR(1000),
    CONSTRAINT [Data_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Blog] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [tags] NVARCHAR(1000),
    [shortdesc] NVARCHAR(max),
    [format] NVARCHAR(max),
    [image] NVARCHAR(1000),
    [video] NVARCHAR(1000),
    [postdate] NVARCHAR(1000),
    [views] FLOAT(53),
    [author] NVARCHAR(1000),
    [htmldesc] NVARCHAR(max),
    CONSTRAINT [Blog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BlogReviews] (
    [id] INT NOT NULL IDENTITY(1,1),
    [comment] NVARCHAR(max) NOT NULL,
    [user] NVARCHAR(1000),
    CONSTRAINT [BlogReviews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Locations] (
    [id] INT NOT NULL IDENTITY(1,1),
    [locations] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [map] NVARCHAR(max),
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
    CONSTRAINT [Locations_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Config] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [key] NVARCHAR(1000),
    [value] NVARCHAR(max),
    CONSTRAINT [Config_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Promo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [promo] NVARCHAR(1000),
    [img] NVARCHAR(1000),
    [description] NVARCHAR(max),
    [startdate] DATETIME2 NOT NULL,
    [enddate] DATETIME2 NOT NULL,
    CONSTRAINT [Promo_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BirthdayPackages] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [plantitle] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [price] FLOAT(53),
    [period] NVARCHAR(1000),
    [includes] NVARCHAR(max),
    CONSTRAINT [BirthdayPackages_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FAQ] (
    [id] INT NOT NULL IDENTITY(1,1),
    [location] NVARCHAR(1000),
    [question] NVARCHAR(max),
    [answer] NVARCHAR(max),
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
