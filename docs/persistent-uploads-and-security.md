# Persistent uploads and security repair

## Confirmed cause

The former upload route wrote to `process.cwd()/public/uploads`. On Hostinger this is part of the running application release, not persistent media storage. The database kept `/uploads/...` even when the underlying file was lost on restart or redeployment. Remote storage URLs would also have been discarded by the public-data normalizer because it accepted only strings beginning with `/`.

## Production configuration

Set `UPLOAD_STORAGE_DRIVER=s3` and configure all `S3_*` variables shown in `.env.example`. `S3_PUBLIC_BASE_URL` must be an HTTPS origin/path that publicly serves bucket objects. Add that hostname and any approved manually entered image hosts to `TRUSTED_IMAGE_HOSTS`. Never commit real values.

The bucket/CORS policy should allow public `GET`/`HEAD` for `projects/*`, `certificates/*`, and `cv/*`, while write/delete permissions remain limited to the application access key. Uploaded objects receive an immutable one-year cache policy and UUID names.

## Hostinger deployment

1. Create or select an S3-compatible bucket outside the application filesystem.
2. Configure the placeholder environment variables in Hostinger's application settings.
3. Install dependencies from the lockfile with `npm ci`.
4. Build with `npm run build` and restart the Node.js application.
5. Upload a small JPEG in the admin, save a published test project, and open the returned HTTPS image URL directly.
6. Restart the application and confirm the same URL and project still work.
7. Redeploy the same commit and repeat the direct URL, homepage card, and project-detail checks.

No data migration is required. Existing local URLs continue to render while their files exist. To preserve old runtime uploads, copy the existing files into the bucket and update the corresponding `thumbnail_url`, `image_url`, `certificate_url`, or `cv_url` values to their new stable HTTPS URLs.

## Rollback

Redeploy the previous application commit and restore the pre-deployment database backup if database schema rollback is required. The only additive schema change is `portfolio_admin_users.session_version`; it can safely remain. Do not delete the bucket during application rollback. Reverting media URLs before removing bucket objects avoids broken images.

## Production verification

- Confirm unauthenticated admin API requests return 401 and cross-origin mutations return 403.
- Confirm the public health response is exactly a minimal `{ "ok": true }` payload.
- Test JPEG, PNG, and WebP uploads; reject SVG, renamed executables, oversized files, and spoofed MIME types.
- Save thumbnail and multiple gallery images; verify Pending becomes Saved and partial failures are reported.
- Verify published/draft visibility, replacement, deletion, hard refresh, restart, and redeployment behavior.
- Inspect client assets and application logs for secrets before release.
