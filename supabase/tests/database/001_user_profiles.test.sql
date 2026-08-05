begin;

select plan(14);

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

select * from finish();

rollback;
