begin;

select plan(22);

select has_table('private', 'profile_change_audit', 'La auditoria privada existe');
select has_column('public', 'profiles', 'first_name', 'El perfil guarda nombre separado');
select has_column('public', 'profiles', 'last_name', 'El perfil guarda apellido separado');
select has_column('public', 'profiles', 'role', 'El perfil guarda rol');
select has_column('public', 'profiles', 'course_year', 'El perfil guarda anio de cursada');
select has_column('public', 'profiles', 'is_responsible', 'El perfil guarda responsabilidad');
select col_not_null('public', 'profiles', 'course_year', 'El anio de cursada es obligatorio');
select col_has_default('public', 'profiles', 'role', 'El rol tiene valor inicial');
select row_security_active('public.profiles', 'RLS sigue activa sobre perfiles');
select row_security_active('private.profile_change_audit', 'RLS esta activa sobre auditoria');
select has_function('public', 'set_profile_role_by_email', array['text', 'text'], 'Existe RPC de rol');
select has_function('public', 'set_profile_responsibility_by_email', array['text', 'boolean'], 'Existe RPC de responsabilidad');
select has_function('public', 'set_profile_course_year_by_email', array['text', 'smallint'], 'Existe RPC de anio');
select has_function('private', 'bootstrap_first_responsible', array['text', 'text'], 'Existe bootstrap privado');
select has_table('public', 'guided_conversations', 'Existen conversaciones guiadas');
select has_table('public', 'guided_messages', 'Existen mensajes guiados');
select has_table('public', 'guided_consultation_usage', 'Existe el registro privado de cuota');
select row_security_active('public.guided_conversations', 'RLS sigue activa sobre conversaciones guiadas');
select row_security_active('public.guided_messages', 'RLS sigue activa sobre mensajes guiados');
select row_security_active('public.guided_consultation_usage', 'RLS sigue activa sobre cuota guiada');
select has_function('public', 'reserve_guided_consultation', array['uuid', 'text'], 'Existe RPC para reservar consultas');
select has_function('public', 'append_guided_response', array['uuid', 'uuid', 'text', 'jsonb'], 'Existe RPC para guardar respuestas');

select * from finish();

rollback;
