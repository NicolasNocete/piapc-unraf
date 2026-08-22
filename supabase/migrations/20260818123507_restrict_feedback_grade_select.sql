revoke select on table public.activity_feedback_versions from authenticated;

grant select (
  id,
  submission_id,
  revision_number,
  reviewer_id,
  body,
  published_at
) on table public.activity_feedback_versions to authenticated;
