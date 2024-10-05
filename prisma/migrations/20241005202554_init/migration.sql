BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[BirthdayPackages] DROP CONSTRAINT [BirthdayPackages_updatedAt_df];

-- AlterTable
ALTER TABLE [dbo].[BlogReviews] DROP CONSTRAINT [BlogReviews_updatedAt_df];

-- AlterTable
ALTER TABLE [dbo].[Config] DROP CONSTRAINT [Config_updatedAt_df];

-- AlterTable
ALTER TABLE [dbo].[Data] DROP CONSTRAINT [Data_updatedAt_df];

-- AlterTable
ALTER TABLE [dbo].[FAQ] DROP CONSTRAINT [FAQ_updatedAt_df];

-- AlterTable
ALTER TABLE [dbo].[Locations] DROP CONSTRAINT [Locations_updatedAt_df];

-- AlterTable
ALTER TABLE [dbo].[Promo] DROP CONSTRAINT [Promo_updatedAt_df];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
