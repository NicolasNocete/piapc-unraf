export type Database = {
  public: {
    Tables: {
      activity_feedback_versions: {
        Row: { body: string; id: string; published_at: string; reviewer_id: string; revision_number: number; submission_id: string };
        Insert: { body: string; id?: string; published_at?: string; reviewer_id: string; revision_number: number; submission_id: string };
        Update: { body?: string; id?: string; published_at?: string; reviewer_id?: string; revision_number?: number; submission_id?: string };
        Relationships: [];
      };
      activity_submission_versions: {
        Row: { activity_version: number; body: string; id: string; submission_id: string; submitted_at: string; version_number: number };
        Insert: { activity_version: number; body: string; id?: string; submission_id: string; submitted_at?: string; version_number: number };
        Update: { activity_version?: number; body?: string; id?: string; submission_id?: string; submitted_at?: string; version_number?: number };
        Relationships: [];
      };
      activity_submissions: {
        Row: { activity_id: string; activity_version: number; created_at: string; id: string; student_id: string; updated_at: string };
        Insert: { activity_id: string; activity_version: number; created_at?: string; id?: string; student_id: string; updated_at?: string };
        Update: { activity_id?: string; activity_version?: number; created_at?: string; id?: string; student_id?: string; updated_at?: string };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          course_year: number;
          created_at: string;
          display_name: string | null;
          first_name: string | null;
          id: string;
          is_responsible: boolean;
          last_name: string | null;
          role: "student" | "professor";
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          course_year?: number;
          created_at?: string;
          display_name?: string | null;
          first_name?: string | null;
          id: string;
          is_responsible?: boolean;
          last_name?: string | null;
          role?: "student" | "professor";
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          course_year?: number;
          created_at?: string;
          display_name?: string | null;
          first_name?: string | null;
          id?: string;
          is_responsible?: boolean;
          last_name?: string | null;
          role?: "student" | "professor";
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      append_feedback_version: {
        Args: { next_body: string; next_reviewer_id: string; target_submission_id: string };
        Returns: undefined;
      };
      append_submission_version: {
        Args: { next_activity_id: string; next_activity_version: number; next_body: string; next_student_id: string };
        Returns: string;
      };
      set_profile_course_year_by_email: {
        Args: { next_course_year: number; target_email: string };
        Returns: undefined;
      };
      set_profile_responsibility_by_email: {
        Args: { next_responsible: boolean; target_email: string };
        Returns: undefined;
      };
      set_profile_role_by_email: {
        Args: { next_role: "student" | "professor"; target_email: string };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
