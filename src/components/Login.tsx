import React from 'react';

export interface Login {
  setBinId(binId: string): void
  binId: string
}

const Login: React.FC<Login> = ({ setBinId, binId }) => {
  const [value, setValue] = React.useState<string>(binId)
  const [disabled, setDisabled] = React.useState<boolean>(false)

  React.useEffect(() => {
    setValue(binId);
    setDisabled(Boolean(binId))
  }, [binId])

  return (
    <form style={css.form} onSubmit={(e) => {
      e.preventDefault()
      setBinId(value);
    }}>
      <input style={css.input} type="text" placeholder="Bin id" onChange={(e) => setValue(e.target.value)} value={value} disabled={disabled} />
      <button type="submit" disabled={disabled}>Ok</button>
      <input type="checkbox" checked={disabled} onClick={() => { setDisabled(!disabled) }} />
    </form>
  );
};

const css = {
  form: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    width: '60px',
  }
}

export default Login
