type ErrorsProps = {
  message: string
  onDismiss: () => void
}

export const ErrorMessage = ({ message, onDismiss }: ErrorsProps) => {
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">"</span>
        <span> {message}</span>
      </div>
      {onDismiss && (
        <button className="error-dismiss" onClick={onDismiss}>
          Dismiss
        </button>
      )}
    </div>
  )
}
