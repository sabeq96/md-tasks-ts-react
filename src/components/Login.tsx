import React from 'react';

export interface Login {
  setBinId(binId: string): void
  binId: string
}

const Login: React.FC<Login> = ({ setBinId, binId }) => {
  const [value, setValue] = React.useState<string>(binId)

  React.useEffect(() => {
    setValue(binId);
  }, [binId])

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      setBinId(value);
    }}>
      <input type="text" placeholder="Bin id" onChange={(e) => setValue(e.target.value)} value={value} />
      <button type="submit">Ok</button>
    </form>
  );
};

export default Login
