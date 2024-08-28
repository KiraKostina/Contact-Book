import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div>
      <p className={css.network_mistake}>
        There is an error! Please try again!
      </p>
    </div>
  );
}
