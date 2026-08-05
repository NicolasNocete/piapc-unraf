grant execute on function private.reserve_guided_consultation(uuid, text) to authenticated;
grant execute on function private.append_guided_response(uuid, uuid, text, jsonb) to authenticated;
grant execute on function private.reserve_guided_rejection(text) to authenticated;
