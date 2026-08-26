export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      activity_feedback_versions: {
        Row: { access_unavailable: boolean; body: string; grade: number | null; id: string; published_at: string; reviewer_id: string; revision_number: number; submission_id: string };
        Insert: { access_unavailable?: boolean; body: string; grade?: number | null; id?: string; published_at?: string; reviewer_id: string; revision_number: number; submission_id: string };
        Update: { access_unavailable?: boolean; body?: string; grade?: number | null; id?: string; published_at?: string; reviewer_id?: string; revision_number?: number; submission_id?: string };
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
      guided_consultation_usage: {
        Row: { created_at: string; id: string; outcome: "accepted" | "rejected"; rejection_category: "academic-private" | "instruction-override" | "unsafe-or-abusive" | null; usage_day: string; user_id: string };
        Insert: { created_at?: string; id?: string; outcome: "accepted" | "rejected"; rejection_category?: "academic-private" | "instruction-override" | "unsafe-or-abusive" | null; usage_day: string; user_id: string };
        Update: { created_at?: string; id?: string; outcome?: "accepted" | "rejected"; rejection_category?: "academic-private" | "instruction-override" | "unsafe-or-abusive" | null; usage_day?: string; user_id?: string };
        Relationships: [];
      };
      guided_conversations: {
        Row: { created_at: string; id: string; updated_at: string; user_id: string };
        Insert: { created_at?: string; id?: string; updated_at?: string; user_id: string };
        Update: { created_at?: string; id?: string; updated_at?: string; user_id?: string };
        Relationships: [];
      };
      guided_messages: {
        Row: { body: string; conversation_id: string; created_at: string; id: string; role: "assistant" | "user"; sources: Json };
        Insert: { body: string; conversation_id: string; created_at?: string; id?: string; role: "assistant" | "user"; sources?: Json };
        Update: { body?: string; conversation_id?: string; created_at?: string; id?: string; role?: "assistant" | "user"; sources?: Json };
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
        Args: { next_access_unavailable: boolean; next_body: string; next_grade: number | null; next_reviewer_id: string; target_submission_id: string };
        Returns: undefined;
      };
      append_guided_response: {
        Args: { next_body: string; next_sources: Json; target_conversation_id: string; target_question_id: string };
        Returns: string;
      };
      append_submission_version: {
        Args: { next_activity_id: string; next_activity_version: number; next_body: string; next_student_id: string };
        Returns: string;
      };
      reserve_guided_consultation: {
        Args: { next_conversation_id: string | null; next_question: string };
        Returns: { conversation_id: string; question_id: string; remaining: number }[];
      };
      reserve_guided_rejection: {
        Args: { next_category: "academic-private" | "instruction-override" | "unsafe-or-abusive" };
        Returns: number;
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
