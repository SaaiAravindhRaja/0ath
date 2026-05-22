export function IdentityFields({ defaultRole = "contributor" }: { defaultRole?: string }) {
  return (
    <>
      <label>
        Public identity
        <input name="actorLabel" required minLength={2} placeholder="Your public name or team" />
      </label>
      <label>
        Invite/admin code
        <input name="inviteCode" type="password" required placeholder="Required for write actions" />
      </label>
      <input type="hidden" name="actorRole" value={defaultRole} />
    </>
  );
}
