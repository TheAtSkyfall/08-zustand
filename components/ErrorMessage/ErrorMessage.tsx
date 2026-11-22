import css from "./ErrorMessage.module.css";

function ErrorMessage() {
  return (
    <p className={css.message} role="alert">
      Something went wrong. Please try again later.
    </p>
  );
}

export default ErrorMessage;
