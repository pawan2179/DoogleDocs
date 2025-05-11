interface ErrorProps{
  errors: Array<string>
}

const Errors = ({errors}: ErrorProps) => {
  return errors.length ? (
    <div>
      {errors.map((error) => {
        return (
          <p key={error} className="text-red-500 font-medium">
            {error}
          </p>
        )
      })}
    </div>
  ) : <></>
}

export default Errors;