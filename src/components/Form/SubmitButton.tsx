const SubmitButton = ({title, isLoading}: {title: string, isLoading: boolean}) => {
  return (
    <button title="Check Records" className="generatorBtn mt-0 text-nowrap" type="submit" disabled={isLoading}>{title}&nbsp;
      {isLoading &&
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
    </button>
  )
}
export default SubmitButton;
