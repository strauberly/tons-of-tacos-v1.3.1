export default function OwnerLoginForm() {
  return (
    <form>
      <label>Owner ID:</label>
      <input
        type="text"
        id="owner_id"
        name="owner_id"
        placeholder="Enter ID"
        maxLength={6}
        required
      />

      <label>Password:</label>
      <input
        type="text"
        id="password"
        name="password"
        placeholder="Enter Password"
        minLength={8}
        required
      />
    </form>
  );
}
