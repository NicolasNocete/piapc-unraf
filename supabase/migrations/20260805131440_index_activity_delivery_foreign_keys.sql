create index activity_submissions_student_id_idx
  on public.activity_submissions (student_id);

create index activity_feedback_versions_reviewer_id_idx
  on public.activity_feedback_versions (reviewer_id);
